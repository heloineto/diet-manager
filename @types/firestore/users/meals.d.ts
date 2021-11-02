interface Meal {
  color: string;
  startsAt: Date | Timestamp;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  label: string;
  isPublic: boolean;
  foods: Food[];
}

type MealWithRef = Meal & {
  ref: FirebaseRef;
};

interface Food {
  amount: number;
  carb: number;
  prot: number;
  fat: number;
  kcal: number;
  foodId: string;
  label: string;
  unit: string;
}

interface FormattedFood {
  amount: string;
  carb: number;
  prot: number;
  fat: number;
  kcal: number;
  foodId: string;
  label: string;
  unit: string;
}

interface Macros {
  carb: number;
  prot: number;
  fat: number;
  kcal: number;
}
