interface Macros {
  carb: number;
  prot: number;
  fat: number;
  kcal: number;
}

interface UserDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  birthdate?: Date;
  metrics?: {
    activityLevel?: 1 | 2 | 3 | 4 | 5;
    height?: {
      current?: number;
    };
    weight?: {
      current?: number;
      desired?: number;
    };
  };
  goals?: {
    general?: {
      loseWeight?: boolean;
      buildMuscle?: boolean;
      beHealthier?: boolean;
    };
    nutrition?: Partial<Macros>;
  };
  gender?: 'M' | 'F' | 'O';
  username?: string;
  savedWorkouts?: Workout[];
}

interface Meal {
  color: string;
  startsAt: import('./firebase').FieldValue | Date;
  createdAt: import('./firebase').FieldValue;
  updatedAt: import('./firebase').FieldValue;
  label: string;
  isPublic: boolean;
  foods: Food[];
}

interface Workout {
  color: string;
  startsAt: import('./firebase').FieldValue | Date;
  createdAt: import('./firebase').FieldValue;
  updatedAt: import('./firebase').FieldValue;
  label: string;
  isPublic: boolean;
  exercises: { [index: number]: Exercise };
}

interface Exercise {
  index: number;
  label: string;
  sets: number;
  reps: number[];
  weight: number[];
}

type FirebaseRef = import('./firebase').FirebaseRef;

type MealWithRef = Meal & {
  ref: FirebaseRef;
};

type WorkoutWithRef = Workout & {
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
