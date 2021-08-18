import type { NextPage } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';
import { Checkboxes, TextField } from 'mui-rff';

import { Button, Container, Typography } from '@material-ui/core';

import { auth } from '@lib/firebase';
import { authErrors } from '@utils/validation';

import AuthIllustration from '@components/decoration/AuthIllustration';
import Main from '@components/layout/Main';
import Widget from '@components/layout/Widget';
import Divider from '@components/layout/Divider';

const Enter: NextPage = () => {
  const enter = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error: { code: string; message: string }) => {
        const { message, faultyField } = authErrors?.[error.code] ?? {};

        return { [faultyField ?? FORM_ERROR]: message ?? error.message };
      });
  };

  return (
    <Main unauthCheck>
      <Container className="lg:flex lg:min-h-screen">
        <AuthIllustration />
        <Widget className="lg:w-1/2 my-auto">
          <Form onSubmit={enter}>
            {({ handleSubmit, submitError, submitting, form }) => (
              <form onSubmit={handleSubmit}>
                <Typography variant="h1" className="-ml-2">
                  Entrar
                </Typography>
                <Typography>
                  Não tem uma conta?{' '}
                  <span className="text-blue-500 underline">
                    <Link href="/register">Cadastre-se.</Link>
                  </span>
                </Typography>
                {submitError && <span className="">{submitError}</span>}
                <div className="mt-5">
                  <div className="flex flex-col gap-y-2.5">
                    <TextField
                      label="E-mail"
                      name="email"
                      className="focus:bg-gray-100 focus:border-blue-500"
                    />
                    <TextField label="Senha" name="password" type="password" />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <Checkboxes
                      name="keepConnected"
                      data={[{ label: 'Continuar conectado', value: true }]}
                    />
                    <Typography className="text-blue-500">
                      <Link href="/recover-password">Esqueceu a senha?</Link>
                    </Typography>
                  </div>
                  <Button className="w-full" disabled={submitting}>
                    Entrar
                  </Button>
                  <Divider className="my-2.5">Ou continue com</Divider>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      // startIcon={}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      // startIcon={}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        </Widget>
      </Container>
    </Main>
  );
};

export default Enter;
