import Link from 'next/link';
import { Form } from 'react-final-form';
import { KeyboardDatePicker, TextField, makeValidate, makeValidateSync } from 'mui-rff';
import { Button, Typography } from '@material-ui/core';

import AuthFlowShell from '@components/app-shells/AuthFlowShell';

import { register } from '@lib/auth';
import { registerSchema } from '@lib/utils/validation';
import PasswordField from '@components/inputs/PasswordField';
import GenderField from '@components/inputs/GenderField';

const Register: NextPage = () => {
  return (
    <AuthFlowShell>
      <Typography variant="h2" className="-ml-2">
        Cadastrar
      </Typography>
      <Typography>
        {'Já tem uma conta? '}
        <span className="text-blue-500 underline">
          <Link href="/enter">Entrar.</Link>
        </span>
      </Typography>
      <Form onSubmit={register} validate={makeValidate(registerSchema) as any}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <TextField label="Nome" name="firstName" />
                  <TextField label="Sobrenome" name="lastName" />
                </div>
                <TextField label="E-mail" name="email" />
                <PasswordField label="Senha" name="password" />
                <KeyboardDatePicker
                  label="Data de nascimento"
                  name="birthdate"
                  format="dd/MM/yyyy"
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="mt-4">
                <GenderField label="Gênero" name="gender" />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500 disabled:shadow-none disabled:bg-primary-200"
                disabled={submitting}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        )}
      </Form>
    </AuthFlowShell>
  );
};

export default Register;
