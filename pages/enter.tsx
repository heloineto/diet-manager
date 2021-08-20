import type { NextPage } from 'next';
import Link from 'next/link';
import { Form } from 'react-final-form';
import { Checkboxes, makeValidate, TextField } from 'mui-rff';
import { Button, Typography } from '@material-ui/core';

import AuthFlowShell from '@components/layout/app-shells/AuthFlowShell';

import { enter } from '@lib/auth';
import { enterSchema } from '@utils/validation';

const Enter: NextPage = () => {
  return (
    <AuthFlowShell>
      <Typography variant="h1" className="-ml-2">
        Entrar
      </Typography>
      <Typography>
        {'Não tem uma conta? '}
        <span className="text-blue-500 underline">
          <Link href="/register">Cadastrar.</Link>
        </span>
      </Typography>
      <Form
        onSubmit={enter}
        initialValues={{ keepConnected: true }}
        validate={makeValidate(enterSchema)}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex flex-col gap-y-4">
                <TextField label="E-mail" name="email" type="text" />
                <TextField label="Senha" name="password" type="password" />
              </div>
              <div className="w-full mt-1 flex justify-between items-center">
                <Checkboxes
                  name="keepConnected"
                  data={{
                    label: 'Continuar conectado',
                    value: true,
                  }}
                />
                <Typography className="text-blue-500">
                  <Link href="/recover-password">Esqueceu a senha?</Link>
                </Typography>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500"
                disabled={submitting}
              >
                Entrar
              </Button>
            </div>
          </form>
        )}
      </Form>
    </AuthFlowShell>
  );
};

export default Enter;
