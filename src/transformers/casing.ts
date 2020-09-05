import { camelCase, upperCamelCase, underScore } from "@tipsypastels/shared";

export const CASING_FUNCTIONS = {
  camelCase,
  UpperCamelCase: upperCamelCase,
  snake_case: underScore,
};

export type Casing = keyof typeof CASING_FUNCTIONS;
export const CASINGS = Object.keys(CASING_FUNCTIONS) as Casing[];