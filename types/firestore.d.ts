interface UserDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  verifiedEmail?: boolean;
  activityLevel?: 1 | 2 | 3 | 4 | 5;
  birthdate?: Date;
  height?: {
    current?: number;
  };
  weight?: {
    current?: number;
    desired?: number;
  };
  goals?: {
    general?: {
      buildMuscle?: boolean;
      loseWeight?: boolean;
      lastName?: boolean;
    };
    nutrition?: {
      carb?: number;
      prot?: number;
      fat?: number;
      kcal?: number;
    };
  };
  gender?: 'M' | 'F' | 'O';
}

interface Meal {
  color: HexColor;
  startsAt: import('./firebase').FieldValue | Date;
  createdAt: import('./firebase').FieldValue;
  updatedAt: import('./firebase').FieldValue;
  label: string;
  isPublic: boolean;
  foods: Food[];
}

type FirebaseRef = import('./firebase').FirebaseRef;

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

interface FoodRecord {
  carb: number;
  prot: number;
  fat: number;
  kcal: number;
  label: string;
  unit: string;
  kj: number;
  cholesterol: number;
  fiber: number;
  calcium: number;
  magnesium: number;
  manganese: number;
  phosphor: number;
  iron: number;
  sodium: number;
  potassium: number;
  copper: number;
  zinc: number;
  retinol: number;
  thiamine: number;
  riboflavin: number;
  pyridoxine: number;
  niacin: number;
  vitaminC: number;
}
