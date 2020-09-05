import mons from './mons.json';

export type Mon = {
  abilities: string[];
  baseStats: unknown;
  baseExp: number;
  baseForm?: string;
  catchRate: number;
  color: string;
  dexEntry: string;
  name: string;
  eggGroups: string[];
  evolutions: unknown;
  evYield: number;
  formName?: string;
  genderRatio: unknown;
  generation: number;
  growthRate: number;
  happiness: number;
  hatchSteps: number;
  height: number;
  hiddenAbility?: string;
  image?: string;
  kind: string;
  moves: unknown;
  number: number;
  slug: string;
  shape: string;
  types: string[];
  weight: number;
}

export default mons as Mon[];