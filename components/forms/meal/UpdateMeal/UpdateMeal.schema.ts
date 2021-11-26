import * as yup from 'yup';

const updateMealSchema = yup.object().shape({
  label: yup.string().required('Forneça um título para a refeição'),
  isPublic: yup.boolean().required(),
  date: yup.date().required('Forneça uma data').typeError('Essa data não é valida'),
  time: yup.date().required('Forneça um horário').typeError('Essa data não é valida'),
  color: yup.string().required('Forneça uma cor'),
});

export default updateMealSchema;
