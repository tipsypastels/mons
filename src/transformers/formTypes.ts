import { Mon } from "../data/mons";

const MEGA_ISH_FORMS = ['Mega', 'Mega X', 'Mega Y'];
const GALAR_ISH_FORMS = ['Galarian', 'Galarian Zen Mode'];

export const FORM_TYPES = {
  Base:   1,
  Mega:   2,
  Alola:  4,
  Galar:  8,
  Other: 16,
} as const;

export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];

export function getFormType(mon: Mon): FormType {
  if (!mon.baseForm) {
    return FORM_TYPES.Base;
  }

  if (MEGA_ISH_FORMS.includes(mon.formName!)) {
    return FORM_TYPES.Mega;
  }

  if (GALAR_ISH_FORMS.includes(mon.formName!)) {
    return FORM_TYPES.Galar;
  }

  if (mon.formName === 'Alolan') {
    return FORM_TYPES.Alola;
  }

  return FORM_TYPES.Other;
}