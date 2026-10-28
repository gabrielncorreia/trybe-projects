import { t } from '../i18n';

// The API's column keys, in table order. Options keep the raw key as their text
// (the tests read it) and show the translated label through the `label` attribute.
export const COLUMNS = [
  'name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain',
  'surface_water', 'population', 'films', 'created', 'edited', 'url',
];

export default function label(column) {
  return t(`columns.${column}`);
}
