import * as yup from 'yup';

const updateAccountSchema = yup.object().shape({
  firstName: yup.string().required('Forneça seu nome'),
  lastName: yup.string().required('Forneça seu sobrenome'),
  newUsername: yup.string().required('Forneça uma identificador').test(),
  birthdate: yup
    .date()
    .required('Forneça sua data de nascimento')
    .max(new Date(), 'A data de aniversário deve ser anterior à data atual.'),
  gender: yup.string().required('Forneça um gênero').length(1),
});

export default updateAccountSchema;
