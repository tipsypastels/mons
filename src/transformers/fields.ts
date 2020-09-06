import { enumKeys } from "@tipsypastels/shared";

const FIELDS = {
  abilities: {
    displayName: 'Abilities',
    defaultOn: true,
  },
  baseStats: {
    displayName: 'Base Stats',
    defaultOn: true,
  },
  baseExp: {
    displayName: 'Base EXP',
    defaultOn: false,
  },
  baseForm: {
    displayName: 'Base Form',
    defaultOn: true,
  },
  catchRate: {
    displayName: 'Catch Rate',
    defaultOn: false,
  },
  color: {
    displayName: 'Color',
    defaultOn: false,
  },
  dexEntry: {
    displayName: 'Pokedex Entry',
    defaultOn: false,
  },
  name: {
    displayName: 'Display Name',
    defaultOn: true,
  },
  eggGroups: {
    displayName: 'Egg Groups',
    defaultOn: false,
  },
  evolutions: {
    displayName: 'Evolutions',
    defaultOn: false,
  },
  evYield: {
    displayName: 'EV Yield',
    defaultOn: false,
  },
  genderRatio: {
    displayName: 'Gender Ratio',
    defaultOn: true,
  },
  growthRate: {
    displayName: 'Growth Rate',
    defaultOn: false,
  },
  happiness: {
    displayName: 'Happiness',
    defaultOn: false,
  },
  hatchSteps: {
    displayName: 'Hatch Steps',
    defaultOn: false,
  },
  height: {
    displayName: 'Height',
    defaultOn: false,
  },
  hiddenAbility: {
    displayName: 'Hidden Ability',
    defaultOn: true,
  },
  kind: {
    displayName: 'Kind',
    defaultOn: true,
  },
  moves: {
    displayName: 'Moveset',
    defaultOn: true,
  },
  number: {
    displayName: 'Number',
    defaultOn: true,
  },
  regionalDexPositions: {
    displayName: 'Regional Positions',
    defaultOn: false,
  },
  slug: {
    displayName: 'Slug',
    defaultOn: true,
  },
  shape: {
    displayName: 'Shape',
    defaultOn: false,
  },
  types: {
    displayName: 'Types',
    defaultOn: true,
  },
  weight: {
    displayName: 'Weight',
    defaultOn: false,
  },
};

function getDefaultOn(fieldName: FieldName) {
  return FIELDS[fieldName].defaultOn;
}

export default FIELDS;
export const FIELD_NAMES = enumKeys(FIELDS);
export const DEFAULT_FIELD_NAMES = FIELD_NAMES.filter(getDefaultOn);
export type FieldName = keyof typeof FIELDS;