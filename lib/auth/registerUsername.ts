import { firestore } from '@lib/firebase';
import { doc, writeBatch } from 'firebase/firestore';

import getSafeUsername from './getSafeUsername';

const registerUsername = async (uid: string, preferredUsername: string) => {
  const batch = writeBatch(firestore);

  const username = await getSafeUsername(uid, preferredUsername);

  const userDoc = doc(firestore, `users/${uid}`);
  batch.update(userDoc, { username });

  const usernameDoc = doc(firestore, `usernames/${username}`);
  batch.set(usernameDoc, { uid });

  try {
    await batch.commit();
  } catch (e) {
    console.log(e);
  }
};

export default registerUsername;
