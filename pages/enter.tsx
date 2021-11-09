import Link from 'next/link';
import { Form } from 'react-final-form';
import { Checkboxes, TextField, makeValidate } from 'mui-rff';
import { Button, Typography } from '@material-ui/core';
import AuthFlowShell from '@components/app-shells/AuthFlowShell';
import { enter } from '@lib/auth';
import { enterSchema } from '@lib/utils/validation';
import PasswordField from '@components/inputs/PasswordField';

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
        validate={makeValidate(enterSchema) as any}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex flex-col space-y-4">
                <TextField label="E-mail" name="email" type="text" />
                <PasswordField label="Senha" name="password" />
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
                className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500 disabled:shadow-none disabled:bg-primary-200"
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
