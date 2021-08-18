import type { NextPage } from 'next';
import Link from 'next/link';
import { Form } from 'react-final-form';
import { Checkboxes, makeValidate, TextField } from 'mui-rff';
import { Button, Container, Typography } from '@material-ui/core';

import AuthIllustration from '@components/decoration/AuthIllustration';
import Main from '@components/layout/Main';
import Widget from '@components/layout/Widget';
import Divider from '@components/layout/Divider';
import GoogleIcon from '@components/icons/GoogleIcon';
import FacebookIcon from '@components/icons/FacebookIcon';

import { continueWithFacebook, continueWithGoogle, enter } from '@lib/auth';
import { enterSchema } from '@utils/validation';

const Enter: NextPage = () => {
  return (
    <Main check="unauth">
      <Container className="lg:flex lg:min-h-screen">
        <AuthIllustration />
        <Widget className="lg:w-2/5 my-auto">
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
            {({ handleSubmit, submitError, submitting, form, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <div className="flex flex-col gap-y-4">
                    <TextField label="E-mail" name="email" />
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
                    className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500"
                    disabled={submitting}
                  >
                    Entrar
                  </Button>
                  {/* <pre>{JSON.stringify(values)}</pre> */}
                </div>
              </form>
            )}
          </Form>
          <Divider className="mt-4 mb-2">Ou continue com</Divider>
          <Button
            className="w-full mt-2 font-bold bg-gray-50 hover:bg-gray-300 text-gray-800 shadow-gray-800 hover:shadow-xl-gray-800"
            color="inherit"
            startIcon={<GoogleIcon />}
            onClick={continueWithGoogle}
          >
            Google
          </Button>
          <Button
            className="w-full mt-2 font-bold bg-blue-500 hover:bg-blue-600 shadow-blue-500 hover:shadow-xl-blue-500"
            startIcon={<FacebookIcon />}
            onClick={continueWithFacebook}
          >
            Facebook
          </Button>
        </Widget>
      </Container>
    </Main>
  );
};

export default Enter;
