import { doc, writeBatch } from 'firebase/firestore';

import { firestore } from '@lib/firebase';
import getSafeUsername from './getSafeUsername';

const updateUsername = async (
  uid: string,
  oldUsername: string,
  newdPreferredUsername: string
) => {
  if (newdPreferredUsername === oldUsername) return;

  const batch = writeBatch(firestore);

  const oldUsernameDoc = doc(firestore, `usernames/${oldUsername}`);
  batch.delete(oldUsernameDoc);

  const newUsername = await getSafeUsername(uid, newdPreferredUsername);

  const userDoc = doc(firestore, `users/${uid}`);
  batch.update(userDoc, { username: newUsername });

  const newUsernameDoc = doc(firestore, `usernames/${newUsername}`);
  batch.set(newUsernameDoc, { uid });

  try {
    await batch.commit();
  } catch (e) {
    console.log(e);
  }
};

export default updateUsername;
