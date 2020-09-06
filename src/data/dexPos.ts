import { Set as ISet } from "immutable";
import { Mon } from "./mons";
import { enumKeys } from "@tipsypastels/shared";

export const REGIONAL_DEXES = [
  'kantoRBYFRLG',
  'kantoLGPE',
  'johtoGSC',
  'johtoHGSS',
  'hoennRSE',
  'hoennORAS',
  'sinnohDP',
  'sinnohPlatinum',
  'unovaBW',
  'unovaBW2',
  'kalos',
  'alolaSM',
  'alolaUSUM',
  'galarVanilla',
  'galarPlusArmor',
  '__NONE__',
] as const;

export type RegionalDex = typeof REGIONAL_DEXES[number];
export type RegionalDexPositions = Partial<Record<RegionalDex, number>>;

export function formatDexName(dex: RegionalDex) {
  return dex.replace(/([A-Z]+)$/, ' $1')
            .replace(/([a-z])(?=[A-Z])/g, '$1 ')
            .replace(/^[a-z]/, c => c.toUpperCase())
            .replace('Plus', '+')
            .replace('__NONE__', 'National Only')
}

export function inAnyDex(dexes: ISet<RegionalDex>, mon: Mon) {
  return dexes.intersect(enumKeys(mon.regionalDexPositions!)).size > 0;
}