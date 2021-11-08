import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import { converter, docExists } from '@lib/utils/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { isNil, omitBy } from 'lodash';
import { registerUsername } from '.';

const continueWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleAuthProvider).catch((error) =>
    console.log(error)
  );

  if (!res) return;

  const user = res.user;
  if (await docExists(`users/${user.uid}`)) return;

  const userDoc = doc(firestore, `users/${user.uid}`).withConverter(
    converter<UserDetails>()
  );

  const userDetails: UserDetails = omitBy(
    { email: user.email, photoUrl: user.photoURL },
    isNil
  );

  if (user.displayName) {
    const [firstName, lastName] = user.displayName.split(' ', 2);

    userDetails['firstName'] = firstName;
    userDetails['lastName'] = lastName;
  }

  await setDoc(userDoc, userDetails);

  await registerUsername(user.uid, user.displayName ?? user.uid);
};

export default continueWithGoogle;
