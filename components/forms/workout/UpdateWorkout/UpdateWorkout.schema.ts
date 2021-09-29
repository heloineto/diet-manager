import * as yup from 'yup';

const updateWorkoutSchema = yup.object().shape({
  label: yup.string().required('Forneça um título para o treino'),
  isPublic: yup.boolean().required(),
  date: yup.date().required('Forneça uma data'),
  time: yup.date().required('Forneça um horário'),
  color: yup.string().required('Forneça uma cor'),
});

export default updateWorkoutSchema;
