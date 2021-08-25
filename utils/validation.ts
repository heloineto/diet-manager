import * as yup from 'yup';

export const enterSchema = yup.object().shape({
  email: yup
    .string()
    .required('Forneça um e-mail')
    .email('Forneça um e-mail válido'),
  password: yup
    .string()
    .required('Forneça uma senha')
    .min(8, 'A senha curta - insira no mínimo 8 caracteres'),
  keepConnected: yup.boolean().required(),
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
    .required('Forneça sua data de nascimento')
    .max(new Date(), 'A data de aniversário deve ser anterior à data atual.'),
  gender: yup.string().required('Forneça um gênero').length(1),
});
