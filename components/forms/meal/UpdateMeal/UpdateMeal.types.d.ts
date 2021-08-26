import type { VariantType } from 'notistack';

export interface AddMealValuesType {
  label: string;
  isPublic: boolean;
  color: Meal['color'];
  date: Date;
  time: Date;
}
