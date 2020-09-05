import React, { useState } from 'react';
import mons, { Mon } from './data/mons';
import { FORM_TYPES, getFormType } from './transformers/formTypes';
import { Range, mapObject } from '@tipsypastels/shared';
import { Set as ISet } from 'immutable';
import applyImage from './transformers/image';
import { SHAPES, ShapeName } from './transformers/shapes';
import LANGUAGES, { LanguageName, LANGUAGE_NAMES } from './transformers/languages';
import { Casing, CASINGS, CASING_FUNCTIONS } from './transformers/casing';
import FIELDS, { DEFAULT_FIELD_NAMES, FieldName, FIELD_NAMES } from './transformers/fields';
import './App.css';

const ALL_GENS = Range(1, 8);

export default function App() {
  const [gens, setGens] = useState(ISet(ALL_GENS));
  const [formTypes, setFormTypes] = useState(-1);
  const [shapeName, setShapeName] = useState<ShapeName>('Slug-keyed data');
  const [langName, setLangName] = useState<LanguageName>('json');
  const [fieldNames, setFieldNames] = useState(ISet(DEFAULT_FIELD_NAMES));
  const [casing, setCasing] = useState<Casing>('camelCase');
  const [image, setImage] = useState('');

  const resultOpts = { 
    formTypes,
    gens,
    image,
    shapeName,
    fieldNames,
    casing,
  };

  function exportResult() {
    const win = window.open()!;
    const result = LANGUAGES[langName].transform(filter(resultOpts).all);

    win.document.write(`<pre>${result}</pre>`);
  }

  const preview = filter({ ...resultOpts, limit: 1 }).first;

  return (
    <main className="App">
      <section className="Controls">
        <h1>Generation Filter</h1>

        <div className="content fields-half fields-grid">
          {ALL_GENS.map((gen) => (
            <label key={gen}>
              <input
                type="checkbox"
                checked={gens.includes(gen)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGens((g) => g.add(gen));
                  } else {
                    setGens((g) => g.delete(gen));
                  }
                }}
              />
              Gen {gen}
            </label>
          ))}
        </div>

        <h1>Forms Filter</h1>

        <div className="content fields-column">
          {mapObject(FORM_TYPES, (name, value) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={(formTypes & value) === value}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormTypes((s) => s | value);
                  } else {
                    setFormTypes((s) => s & ~value);
                  }
                }}
              />
              {name} Forms
            </label>
          ))}
        </div>

        <h1>Fields Filter</h1>

        <div className="content fields-grid">
          {FIELD_NAMES.map(fieldName => (
            <label key={fieldName}>
              <input 
                type="checkbox"
                checked={fieldNames.has(fieldName)}
                onChange={e => {
                  if (e.target.checked) {
                    setFieldNames(s => s.add(fieldName));
                  } else {
                    setFieldNames(s => s.delete(fieldName));
                  }
                }}
              />

              {FIELDS[fieldName].displayName}
            </label>
          ))}
        </div>

        <div className="button-row">
          <button 
            className="text-button" 
            onClick={() => setFieldNames(ISet(FIELD_NAMES))}
          >
            All
          </button>

          <button
            className="text-button"
            onClick={() => setFieldNames(ISet([]))}
          >
            None
          </button>

          <button
            className="text-button"
            onClick={() => setFieldNames(ISet(DEFAULT_FIELD_NAMES))}
          >
            Defaults
          </button>
        </div>

        <h1>Image Format</h1>

        <div className="content">
          <p>
            Images are not provided, but if you have an image provider you can
            optionally use this field to attach them. Enter the full URL of the
            image, using <code>$NUMBER</code>, <code>$SLUG</code>, or{" "}
            <code>$NAME</code> as placeholders.
          </p>

          <p>
            <strong>
              Example:{' '}
            </strong>
            
            <code>
              https://my-pokemon-image-site.com/images/$NUMBER.png
            </code>
          </p>

          <input 
            value={image}
            onChange={e => setImage(e.target.value)}
            className="wide-input" 
            placeholder="No image provider." 
          />
        </div>

        <h1>
          Output Field Casing
        </h1>

        <div className="content fields-column">
          {CASINGS.map(c => (
            <label key={c}>
              <input
                type="radio"
                checked={casing === c}
                onChange={e => {
                  if (e.target.checked) {
                    setCasing(c);
                  }
                }}
              />

              {c}
            </label>
          ))}
        </div>

        <h1>
          Output Shape
        </h1>

        <div className="content fields-column">
          {Object.keys(SHAPES).map(name => (
            <label key={name}>
              <input
                type="radio"
                checked={shapeName === name}
                onChange={e => {
                  if (e.target.checked) {
                    setShapeName(name as ShapeName);
                  }
                }}
              />

              {name}
            </label>
          ))}
        </div>

        <h1>
          Output Language
        </h1>

        <div className="content fields-column">
          {LANGUAGE_NAMES.map(name => (
            <label key={name}>
              <input
                type="radio"
                checked={langName === name}
                onChange={e => {
                  if (e.target.checked) {
                    setLangName(name);
                  }
                }}
              />

              {LANGUAGES[name].displayName}
            </label>
          ))}
        </div>

        <div className="button-row">
          <button className="submit" onClick={exportResult}>
            Export
          </button>
        </div>
      </section>

      <section className="Preview">
        <h2 className="Preview-title">Output preview</h2>

        <p>
          {preview 
            ? "Showing the first result."
            : "There were no results."}
        </p>

        <pre>{LANGUAGES[langName].transform(preview)}</pre>
      </section>
    </main>
  );
}

type FilterOpts = {
  formTypes: number;
  gens: ISet<number>;
  limit?: number;
  image: string;
  shapeName: ShapeName;
  fieldNames: ISet<FieldName>;
  casing: Casing;
}

function filter({ 
  formTypes,
  gens, 
  limit,
  image,
  shapeName,
  fieldNames,
  casing,
}: FilterOpts) {
  const collection = new SHAPES[shapeName]();

  for (let i = 0; i < mons.length; i++) {
    if (limit && collection.size >= limit) {
       break;
    }

    const mon = mons[i];

    if (!gens.has(mon.generation)) {
      continue;
    }

    const formType = getFormType(mon);
    if ((formTypes & formType) !== formType) {
      continue;
    }

    const monWithImg = applyImage(image, mon);
    
    const transformedMon = applyFieldsAndCasing(
      casing, 
      fieldNames, 
      monWithImg
    );
    
    collection.push(monWithImg, transformedMon);
  }

  return collection;
}

function applyFieldsAndCasing(
  casing: Casing, 
  fields: ISet<FieldName>, 
  mon: Mon,
) {
  const func = CASING_FUNCTIONS[casing];
  const output: any = {};
  let key: keyof Mon;

  for (key in mon) {
    if (fields.has(key as FieldName)) {
      output[func(key) as keyof Mon] = mon[key];
    }
  }

  return output as unknown;
}
