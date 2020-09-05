import { stringify as stringifyYAML } from 'yaml';

const LANGUAGES = {
  json: {
    displayName: 'JSON',
    transform: function (data: any) {
      return JSON.stringify(data, null, 2);
    },
  },
  yaml: {
    displayName: 'YAML',
    transform: function (data: any) {
      return stringifyYAML(data);
    },
  }
};

export default LANGUAGES;
export const LANGUAGE_NAMES = Object.keys(LANGUAGES) as LanguageName[];
export type LanguageName = keyof typeof LANGUAGES;