import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FORM_ERROR } from 'final-form';

import { auth, firestore } from '@lib/firebase';
import { converter } from '@lib/utils/firestore';
import registerUsername from './registerUsername';
import { authErrors, isFirebaseAuthError } from './utils';

type DeepNonNullable<T> = { [P in keyof T]-?: NonNullable<T[P]> } & NonNullable<T>;

const register = async ({
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
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const uid = res.user?.uid;

    if (uid) {
      const userRef = doc(firestore, `users/${uid}`).withConverter(
        converter<UserDetails>()
      );

      const userDetails = {
        email,
        firstName,
        lastName,
        birthdate,
        gender,
      };

      await setDoc(userRef, userDetails);

      await registerUsername(uid, `${firstName} ${lastName}`);
    }
  } catch (error) {
    if (isFirebaseAuthError(error)) {
      const message = authErrors?.[error.code].message ?? error.message;
      const faultyField = authErrors?.[error.code].faultyField ?? FORM_ERROR;

      return { [faultyField]: message };
    }
  }
};

export default register;
