import * as yup from 'yup';

const updateExerciseSchema = yup.object().shape({
  label: yup.string().required('Forneça um nome'),
  sets: yup.number().required(),
});

export default updateExerciseSchema;

// index: exercise.index,
// label: exercise.label,
// sets: exercise.sets,
// reps: exercise.reps,
// weight: exercise.weight,
