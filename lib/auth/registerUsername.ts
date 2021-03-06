import { firestore } from '@lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';

import getSafeUsername from './getSafeUsername';

const registerUsername = async (uid: string, preferredUsername: string) => {
  const batch = writeBatch(firestore);

  const username = await getSafeUsername(uid, preferredUsername);

  const userRef = doc(firestore, `users/${uid}`);
  batch.update(userRef, { username });

  const usernameRef = doc(firestore, `usernames/${username}`);
  batch.set(usernameRef, { uid });

  try {
    await batch.commit();
  } catch (e) {
    console.log(e);
  }
};

export default registerUsername;
