import mons from './mons.json';
import { RegionalDexPositions } from './dexPos';

export type Mon = {
  abilities: string[];
  baseStats: any;
  baseExp: number;
  baseForm?: string;
  catchRate: number;
  color: string;
  dexEntry: string;
  name: string;
  eggGroups: string[];
  evolutions: any;
  evYield: number;
  formName?: string;
  genderRatio: any;
  generation: number;
  growthRate: number;
  happiness: number;
  hatchSteps: number;
  height: number;
  hiddenAbility?: string;
  image?: string;
  kind: string;
  moves: any;
  number: number;
  regionalDexPositions?: RegionalDexPositions;
  slug: string;
  shape: string;
  types: string[];
  weight: number;
}

export default mons as Mon[];