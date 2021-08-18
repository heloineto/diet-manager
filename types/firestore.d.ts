interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  verifiedEmail: boolean;
  activityLevel: 1 | 2 | 3 | 4 | 5;
  birthdate: Date;
  height: {
    current: number;
  };
  weight: {
    current: number;
    desired: number;
  };
  goals: {
    general: {
      buildMuscle: boolean;
      loseWeight: boolean;
      lastName: boolean;
    };
    nutrition: {
      carb: number;
      prot: number;
      fat: number;
      kcal: number;
    };
  };
  gender: {
    letter: 'M' | 'F';
    additionalInformation: string;
  };
}

interface Meal {
  // color: "red"| | | |;
  createdAt: Date;
  startsAt: Date;
  updatedAt: Date;
  label: string;
  public: boolean;
  foods: Food[];
}

interface Food {}
