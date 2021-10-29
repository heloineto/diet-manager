import { Persistence, setPersistence, signInWithEmailAndPassword } from '@firebase/auth';
import { FORM_ERROR } from 'final-form';

import { auth } from '@lib/firebase';
import { authErrors, isFirebaseAuthError } from './utils';

const enter = async ({
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
  const persistence = keepConnected ? 'LOCAL' : 'SESSION';

  setPersistence(auth, persistence as unknown as Persistence);

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (isFirebaseAuthError(error)) {
      const message = authErrors?.[error.code].message ?? error.message;
      const faultyField = authErrors?.[error.code].faultyField ?? FORM_ERROR;

      return { [faultyField]: message };
    }
  }
};

export default enter;
