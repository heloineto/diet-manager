import { converter } from '@utils/firestore';
import { FORM_ERROR } from 'final-form';

import {
  auth,
  facebookAuthProvider,
  firestore,
  googleAuthProvider,
  LOCAL,
  SESSION,
} from './firebase';

export const AUTH_ERRORS: {
  [code: string]: { message: string; faultyField: string };
} = {
  'auth/user-not-found': {
    message: 'E-mail incorreto ou inexistente. Tente outro.',
    faultyField: 'email',
  },
  'auth/wrong-password': {
    message:
      'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la',
    faultyField: 'password',
  },
  'auth/email-already-in-use': {
    message: 'Já existe uma conta associada a este e-mail. Tente outro',
    faultyField: 'email',
  },
};

export const continueWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleAuthProvider);

    if (res.additionalUserInfo) {
      const { profile, isNewUser } = res.additionalUserInfo as {
        isNewUser: boolean;
        profile: {
          given_name?: string;
          family_name?: string;
          email?: string;
          picture?: string;
          verified_email?: boolean;
        };
      };

      if (profile && isNewUser) {
        const userDoc = firestore
          .collection('user')
          .doc(res.user?.uid)
          .withConverter(converter<UserDetails>());

        await userDoc.set({
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          photoURL: profile.picture,
          verifiedEmail: profile.verified_email,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const continueWithFacebook = async () => {
  const res = await auth.signInWithPopup(facebookAuthProvider);

  console.log(res);
};

export const enter = async ({
  email,
  password,
  keepConnected,
}: {
  email: string;
  password: string;
  keepConnected: boolean;
}) => {
  //! Verify if persistence has been properly set
  //! Maybe it should be kept in the form instead
  auth.setPersistence(keepConnected ? LOCAL : SESSION);

  try {
    return auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    const { message, faultyField } = AUTH_ERRORS?.[error.code] ?? {};
    return { [faultyField ?? FORM_ERROR]: message ?? error.message };
  }
};

type DeepNonNullable<T> = { [P in keyof T]-?: NonNullable<T[P]> } &
  NonNullable<T>;

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  birthdate,
  gender,
}: DeepNonNullable<
  Pick<UserDetails, 'email' | 'firstName' | 'lastName' | 'birthdate' | 'gender'>
> & { password: string }) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    const userDoc = firestore
      .collection('user')
      .doc(res.user?.uid)
      .withConverter(converter<UserDetails>());

    await userDoc.set({
      email,
      firstName,
      lastName,
      birthdate,
      gender,
    });
  } catch (error) {
    const { message, faultyField } = AUTH_ERRORS[error.code] ?? {};
    return { [faultyField ?? FORM_ERROR]: message ?? error.message };
  }
};

export const leave = async () => {
  await auth.signOut();
};
