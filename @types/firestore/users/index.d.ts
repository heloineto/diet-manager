interface UserDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  birthdate?: FieldValue | Date;
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
