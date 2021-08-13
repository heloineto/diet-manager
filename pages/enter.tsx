import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';

import { Container } from '@material-ui/core';

import { auth } from '@lib/firebase';
import { authErrors } from '@utils/validation';

import UnauthCheck from '@components/auth/UnauthCheck';

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
    <UnauthCheck>
      <Container>
        <div className="auth-illustration">
          {/* <Image
            className="auth-wordmark"
            src="/wordmark.svg"
            alt="wordmark"
            layout="fill"
          /> */}
        </div>
        <div className="form-wrapper-right">
          <Form onSubmit={enter}>
            {({ handleSubmit, submitError, submitting, form }) => (
              <form onSubmit={handleSubmit} className="widget-wrapper">
                <h1>Entrar</h1>
                <p>
                  Não tem uma conta?{' '}
                  <span className="link">
                    <Link href="/register">Cadastre-se.</Link>
                  </span>
                </p>
                {submitError && <span className="">{submitError}</span>}
                <div className="form-grid">
                  <div className="input-fields-wrapper">
                    <TextField
                      label="E-mail"
                      name="email"
                      placeholder="Por favor entre seu e-mail"
                    />
                    {/* <TextInputField
                        label="E-mail"
                        name="email"
                        placeholder="Por favor entre seu e-mail"
                      />
                      <TextInputField
                        label="Senha"
                        name="password"
                        type="password"
                        placeholder="Por favor entre sua senha"
                      /> */}
                  </div>
                  <div className="w-full flex justify-between">
                    {/* <CheckBox
                        name="keepConnected"
                        label="Continuar conectado"
                        initialValue={true}
                      /> */}
                    <p className="text-blue-500">
                      <Link href="/recover-password">Esqueceu a senha?</Link>
                    </p>
                  </div>
                  {/* <SimpleButton
                      type="submit"
                      disabled={submitting}
                      onClick={form.submit}
                    > */}
                  Entrar
                  {/* </SimpleButton>
                    <HorizontalTextDivider text="Ou" />
                    <FacebookButton />
                    <GoogleButton /> */}
                </div>
              </form>
            )}
          </Form>
        </div>
      </Container>
    </UnauthCheck>
  );
};

export default Enter;
