import type { NextPage } from 'next';
import Link from 'next/link';
import { Form } from 'react-final-form';
import { Checkboxes, makeValidate, TextField } from 'mui-rff';
import { Button, Container, Typography } from '@material-ui/core';

import AuthIllustration from '@components/decoration/AuthIllustration';
import Main from '@components/layout/Main';
import Widget from '@components/layout/Widget';
import Divider from '@components/layout/Divider';
import ColorButton from '@components/buttons/ColorButton';
import GoogleIcon from '@components/icons/GoogleIcon';
import FacebookIcon from '@components/icons/FacebookIcon';

import { enter } from '@lib/auth';
import { enterSchema } from '@utils/validation';

const Enter: NextPage = () => {
  return (
    <Main unauthCheck>
      <Container className="lg:flex lg:min-h-screen">
        <AuthIllustration />
        <Widget className="lg:w-1/2 my-auto">
          <Form
            onSubmit={enter}
            initialValues={{ keepConnected: true }}
            validate={makeValidate(enterSchema)}
          >
            {({ handleSubmit, submitError, submitting, form, values }) => (
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
                      data={{
                        label: 'Continuar conectado',
                        value: true,
                      }}
                    />
                    <Typography className="text-blue-500">
                      <Link href="/recover-password">Esqueceu a senha?</Link>
                    </Typography>
                  </div>
                  <Button className="w-full" disabled={submitting}>
                    Entrar
                  </Button>
                  <Divider className="my-2.5">Ou continue com</Divider>

                  <ColorButton
                    className="w-full mt-2 font-bold"
                    color="#ffffff"
                    contrastColor="#1f2937"
                    shadowColor="#1f2937"
                    startIcon={<GoogleIcon />}
                  >
                    Google
                  </ColorButton>
                  <ColorButton
                    className="w-full mt-2 font-bold"
                    color="#3b82f6"
                    contrastColor="#ffffff"
                    shadowColor="#3b82f6"
                    startIcon={<FacebookIcon />}
                  >
                    Facebook
                  </ColorButton>
                  {/* <pre>{JSON.stringify(values)}</pre> */}
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
