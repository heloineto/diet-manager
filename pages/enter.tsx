import type { NextPage } from 'next';
import { FORM_ERROR } from 'final-form';
import Link from 'next/link';

import { auth } from '@lib/firebase';
import { errorCodes } from '@utils/validation';

import UnauthCheck from '@components/auth/UnauthCheck';
import { Form } from 'react-final-form';

const Enter: NextPage = () => {
  const onEnter = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .catch((error: { code: string; message: string }) => {
        const { message, faultyField } = errorCodes?.[error.code] ?? {};

        return { [faultyField ?? FORM_ERROR]: message ?? error.message };
      });
  };

  return (
    <UnauthCheck>
      <main className="layout-grid">
        <div className="auth-illustration">
          <img className="auth-wordmark" src="/wordmark.svg" alt="wordmark" />
        </div>
        <div className="form-wrapper-right">
          <Form onSubmit={onEnter}>
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
                    <TextInputField
                      label="E-mail"
                      name="email"
                      placeholder="Por favor entre seu e-mail"
                    />
                    <TextInputField
                      label="Senha"
                      name="password"
                      type="password"
                      placeholder="Por favor entre sua senha"
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <CheckBox
                      name="keepConnected"
                      label="Continuar conectado"
                      initialValue={true}
                    />
                    <p className="text-blue-500">
                      <Link href="/recover-password">Esqueceu a senha?</Link>
                    </p>
                  </div>
                  <SimpleButton
                    type="submit"
                    disabled={submitting}
                    onClick={form.submit}
                  >
                    Entrar
                  </SimpleButton>
                  {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
                  <HorizontalTextDivider text="Ou" />
                  <FacebookButton />
                  <GoogleButton />
                </div>
              </form>
            )}
          </Form>
        </div>
      </main>
    </UnauthCheck>
  );
};

export default Enter;
