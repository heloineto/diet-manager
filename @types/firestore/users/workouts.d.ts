interface Workout {
  color: string;
  startsAt: Date | Timestamp;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  label: string;
  isPublic: boolean;
  exercises: { [index: number]: Exercise };
}

type WorkoutWithRef = Workout & {
  ref: FirebaseRef;
};

interface Exercise {
  index: number;
  label: string;
  sets: number;
  reps: number[];
  weight: number[];
}
