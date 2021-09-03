import { converter } from '@utils/firestore';
import { getRandomInt } from '@utils/typescript';
import { FORM_ERROR } from 'final-form';
import { kebabCase } from 'lodash';

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

export const docExists = async (documentPath: string) => {
  const doc = firestore.doc(documentPath);
  const { exists } = await doc.get();
  return exists;
};

export const getSafeUsername = async (
  uid: string,
  preferredUsername: string
) => {
  let username = kebabCase(preferredUsername);
  let exists = await docExists(`usernames/${username}`);

  if (exists) {
    const oldUsername = username;
    let attempts = 0;

    while (exists) {
      if (attempts > 10) return uid;

      username = `${oldUsername}-${getRandomInt(9999)}`;
      exists = await docExists(`usernames/${username}`);

      attempts++;
    }
  }

  return username;
};

export const updateUsername = async (
  uid: string,
  oldUsername: string,
  newdPreferredUsername: string
) => {
  console.log(oldUsername, newdPreferredUsername);

  if (newdPreferredUsername === oldUsername) return;

  const batch = firestore.batch();

  const oldUsernameDoc = firestore.doc(`usernames/${oldUsername}`);
  batch.delete(oldUsernameDoc);
  console.log('WHAT');

  const newUsername = await getSafeUsername(uid, newdPreferredUsername);

  const userDoc = firestore.doc(`users/${uid}`);
  batch.update(userDoc, { username: newUsername });
  console.log('WHAT');

  const newUsernameDoc = firestore.doc(`usernames/${newUsername}`);
  batch.set(newUsernameDoc, { uid });
  console.log('WHAT');

  try {
    await batch.commit();
    console.log('WHAT');
  } catch (e) {
    console.log(e);
  }
};

export const registerUsername = async (
  uid: string,
  preferredUsername: string
) => {
  const batch = firestore.batch();

  const username = await getSafeUsername(uid, preferredUsername);

  const userDoc = firestore.doc(`users/${uid}`);
  batch.update(userDoc, { username });

  const usernameDoc = firestore.doc(`usernames/${username}`);
  batch.set(usernameDoc, { uid });

  try {
    await batch.commit();
  } catch (e) {
    console.log(e);
  }
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

      const uid = res.user?.uid;

      if (uid && profile && isNewUser) {
        const userDoc = firestore
          .collection('users')
          .doc(uid)
          .withConverter(converter<UserDetails>());

        const userDetails = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          photoURL: profile.picture,
        };

        await userDoc.set(userDetails);

        await registerUsername(
          uid,
          `${userDetails.firstName} ${userDetails.lastName}`
        );
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
    await auth.signInWithEmailAndPassword(email, password);
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

    const uid = res.user?.uid;

    if (uid) {
      const userDoc = firestore
        .collection('users')
        .doc(uid)
        .withConverter(converter<UserDetails>());

      const userDetails = {
        email,
        firstName,
        lastName,
        birthdate,
        gender,
      };

      await userDoc.set(userDetails);

      await registerUsername(uid, `${firstName} ${lastName}`);
    }
  } catch (error) {
    const { message, faultyField } = AUTH_ERRORS[error.code] ?? {};
    return { [faultyField ?? FORM_ERROR]: message ?? error.message };
  }
};

export const leave = async () => {
  await auth.signOut();
};
