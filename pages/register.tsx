import type { NextPage } from 'next';
import Link from 'next/link';
import { Form } from 'react-final-form';
import { KeyboardDatePicker, makeValidate, Radios, TextField } from 'mui-rff';
import { Button, Container, Typography } from '@material-ui/core';

import AuthIllustration from '@components/decoration/AuthIllustration';
import Main from '@components/layout/Main';
import Widget from '@components/layout/Widget';
import Divider from '@components/layout/Divider';
import GoogleIcon from '@components/icons/GoogleIcon';
import FacebookIcon from '@components/icons/FacebookIcon';

import { continueWithFacebook, continueWithGoogle, enter } from '@lib/auth';
import { registerSchema } from '@utils/validation';

import DateFnsUtils from '@date-io/date-fns';

const Register: NextPage = () => {
  return (
    <Main unauthCheck>
      <Container className="lg:flex lg:min-h-screen">
        <AuthIllustration />
        <Widget className="lg:w-2/5 my-auto">
          <Typography variant="h2" className="-ml-2">
            Cadastrar
          </Typography>
          <Typography>
            {'Já tem uma conta? '}
            <span className="text-blue-500 underline">
              <Link href="/enter">Entrar.</Link>
            </span>
          </Typography>
          <Form onSubmit={enter} validate={makeValidate(registerSchema)}>
            {({ handleSubmit, submitError, submitting, form, values }) => (
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
                    className="w-full mt-1 shadow-primary-500 hover:shadow-xl-primary-500"
                    disabled={submitting}
                  >
                    Cadastrar
                  </Button>
                  <pre>{JSON.stringify(values, undefined, 2)}</pre>
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

export default Register;
