import { doc, writeBatch } from 'firebase/firestore';

import { firestore } from '@lib/firebase';
import getSafeUsername from './getSafeUsername';

const updateUsername = async (
  uid: string,
  oldUsername: string,
  newPreferredUsername: string
) => {
  if (newPreferredUsername === oldUsername) return;

  const batch = writeBatch(firestore);

  const oldUsernameDoc = doc(firestore, `usernames/${oldUsername}`);
  batch.delete(oldUsernameDoc);

  const newUsername = await getSafeUsername(uid, newPreferredUsername);

  const userDoc = doc(firestore, `users/${uid}`);
  batch.update(userDoc, { username: newUsername });

  const newUsernameDoc = doc(firestore, `usernames/${newUsername}`);
  batch.set(newUsernameDoc, { uid });

  await batch.commit().catch((error) => console.log(error));
};

export default updateUsername;
