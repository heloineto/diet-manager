import { converter } from '@utils/firestore';
import { FORM_ERROR } from 'final-form';

import { auth, firestore, googleAuthProvider } from './firebase';

export const continueWithGoogle = async () => {
  const res = await auth.signInWithPopup(googleAuthProvider);

  const { profile, isNewUser } = res?.additionalUserInfo as {
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
      .doc(res?.user?.uid)
      .withConverter(converter<UserDetails>());

    await userDoc.set({
      firstName: profile.given_name ?? '',
      lastName: profile.family_name ?? '',
      email: profile.email ?? '',
      photoURL: profile.picture ?? '',
      verifiedEmail: profile.verified_email ?? false,
    });
  }
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
  return auth
    .signInWithEmailAndPassword(email, password)
    .catch((error: { code: string; message: string }) => {
      const { message, faultyField } = authErrors?.[error.code] ?? {};

      return { [faultyField ?? FORM_ERROR]: message ?? error.message };
    });
};

export const leave = async () => {
  auth.signOut();
};

const authErrors: {
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
    message: 'Já existe uma conta associada a este e-mail. Tente outro.',
    faultyField: 'email',
  },
};
