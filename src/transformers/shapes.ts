import { Mon } from "../data/mons";

export abstract class Shape<T extends {}> {
  abstract getInitialValue(): T;
  abstract pushInternal(mon: Mon, transformedMon: unknown): void;

  protected memo: T;
  public size: number;

  constructor() {
    this.memo = this.getInitialValue();
    this.size = 0;
  }

  push(mon: Mon, transformedMon: unknown) {
    this.pushInternal(mon, transformedMon);
    this.size++;
  }

  get all() {
    return this.memo;
  }
  
  get first() {
    if (Array.isArray(this.memo)) {
      return [this.memo[0]];
    } else {
      const firstEntry = Object.entries(this.memo)[0] as [keyof T, T[keyof T]];
      return Object.fromEntries([firstEntry]);
    }
  }
}

class SlugKeyedData extends Shape<Record<string, unknown>> {
  getInitialValue() {
    return {};
  }

  pushInternal(mon: Mon, transformedMon: unknown) {
    this.memo[mon.slug] = transformedMon;
  }
}

class NumberKeyedData extends Shape<Record<number, unknown>> {
  getInitialValue() {
    return {};
  }

  pushInternal(mon: Mon, transformedMon: unknown) {
    this.memo[mon.number] = transformedMon;
  }
}

class SlugsArray extends Shape<string[]> {
  getInitialValue() {
    return [];
  }

  pushInternal(mon: Mon, _: unknown) {
    this.memo.push(mon.slug);
  }
}

class DataArray extends Shape<unknown[]> {
  getInitialValue() {
    return [];
  }

  pushInternal(_: Mon, transformedMon: unknown) {
    this.memo.push(transformedMon);
  }
}

class SlugDataEntries extends Shape<[string, unknown][]> {
  getInitialValue() {
    return [];
  }

  pushInternal(mon: Mon, transformedMon: unknown) {
    this.memo.push([mon.slug, transformedMon]);
  }
}

class NumberDataEntries extends Shape<[number, unknown][]> {
  getInitialValue() {
    return [];
  }

  pushInternal(mon: Mon, transformedMon: unknown) {
    this.memo.push([mon.number, transformedMon]);
  }
}

export const SHAPES = {
  'Slug-keyed data': SlugKeyedData,
  'Number-keyed data': NumberKeyedData,
  'Array of slugs': SlugsArray,
  'Array of data': DataArray,
  '2D Array of slugs and data': SlugDataEntries,
  '2D Array of numbers and data': NumberDataEntries,
};

export type ShapeName = keyof typeof SHAPES;