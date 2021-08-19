import type { NextPage } from 'next';
import Link from 'next/link';
import { Form } from 'react-final-form';
import { KeyboardDatePicker, makeValidate, Radios, TextField } from 'mui-rff';
import { Button, Typography } from '@material-ui/core';

import AuthFlowShell from '@components/layout/app-shells/AuthFlowShell';

import { register } from '@lib/auth';
import { registerSchema } from '@utils/validation';

import DateFnsUtils from '@date-io/date-fns';

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
      <Form onSubmit={register} validate={makeValidate(registerSchema)}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                  <TextField label="Nome" name="firstName" />
                  <TextField label="Sobrenome" name="lastName" />
                </div>
                <TextField label="E-mail" name="email" />
                <TextField label="Senha" name="password" type="password" />
                <KeyboardDatePicker
                  label="Data de nascimento"
                  name="birthdate"
                  dateFunsUtils={DateFnsUtils}
                  format="dd/MM/yyyy"
                  placeholder="dd/mm/yyyy"
                  color="secondary"
                />
              </div>
              <div className="mt-4">
                <Radios
                  label="Gênero"
                  name="gender"
                  data={[
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                    { label: 'Outro', value: 'O' },
                  ]}
                  radioGroupProps={{ row: true }}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500"
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
