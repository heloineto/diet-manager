import type { VariantType } from 'notistack';

export interface UpdateMealValuesType {
  label: string;
  isPublic: boolean;
  color: Meal['color'];
  date: Date;
  time: Date;
}
