import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

import { auth, firestore } from '@lib/firebase';
import { converter } from '@lib/utils/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { isNil, omitBy } from 'lodash';
import { registerUsername } from '.';

const continueWithGoogle = async () => {
  const res = await signInWithPopup(auth, new GoogleAuthProvider()).catch((error) =>
    console.log(error)
  );
  if (!res) return;

  console.log(res);

  const user = res.user;
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

  console.log(userDetails);

  await setDoc(userDoc, userDetails);

  await registerUsername(user.uid, `${userDetails.firstName} ${userDetails.lastName}`);
};

export default continueWithGoogle;
