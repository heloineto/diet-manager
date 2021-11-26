import { kebabCase } from 'lodash';
import * as yup from 'yup';

yup.addMethod(yup.string, 'isKebabCase', function (errorMessage: string) {
  return this.test(`test-kebak-case`, errorMessage, function (value) {
    const { path, createError } = this;

    return value === kebabCase(value) || createError({ path, message: errorMessage });
  });
});

const updateAccountSchema = yup.object().shape({
  firstName: yup.string().required('Forneça seu nome'),
  lastName: yup.string().required('Forneça seu sobrenome'),
  newUsername: yup.string().required('Forneça uma identificador'),
  // @ts-ignore Yup doesn`t identify new custom methods
  //! verify that this verification is not needed since it's done on the field level
  //! .isKebabCase('Identificador inválido'),
  birthdate: yup
    .date()
    .required('Forneça sua data de nascimento')
    .max(new Date(), 'A data de aniversário deve ser anterior à data atual.')
    .typeError('Essa data não é valida'),
  gender: yup.string().required('Forneça um gênero').length(1),
});

export default updateAccountSchema;
