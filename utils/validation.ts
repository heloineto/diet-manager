import * as Yup from 'yup';

export const enterSchema = Yup.object().shape({
  keepConnected: Yup.boolean().required(),
  email: Yup.string()
    .required('Forneça um e-mail')
    .email('Forneça um e-mail válido'),
  password: Yup.string()
    .required('Forneça uma senha')
    .min(8, 'A senha curta - insira no mínimo 8 caracteres'),
});
