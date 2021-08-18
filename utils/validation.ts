import * as yup from 'yup';

export const enterSchema = yup.object().shape({
  keepConnected: yup.boolean().required(),
  email: yup
    .string()
    .required('Forneça um e-mail')
    .email('Forneça um e-mail válido'),
  password: yup
    .string()
    .required('Forneça uma senha')
    .min(8, 'A senha curta - insira no mínimo 8 caracteres'),
});

export const registerSchema = yup.object().shape({
  firstName: yup.string().required('Forneça seu nome'),
  lastName: yup.string().required('Forneça seu sobrenome'),
  email: yup
    .string()
    .required('Forneça um e-mail')
    .email('Forneça um e-mail válido'),
  password: yup
    .string()
    .required('Forneça uma senha')
    .min(8, 'A senha curta - insira no mínimo 8 caracteres'),
  birthdate: yup
    .date()
    .required('Forneça sua data de aniversário')
    .max(new Date(), 'A data de aniversário deve ser anterior à data atual.'),
  sex: yup.string().required('Forneça um sexo').length(1),
});
