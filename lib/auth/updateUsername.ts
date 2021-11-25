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

  const oldUsernameRef = doc(firestore, `usernames/${oldUsername}`);
  batch.delete(oldUsernameRef);

  const newUsername = await getSafeUsername(uid, newPreferredUsername);

  const userRef = doc(firestore, `users/${uid}`);
  batch.update(userRef, { username: newUsername });

  const newUsernameRef = doc(firestore, `usernames/${newUsername}`);
  batch.set(newUsernameRef, { uid });

  await batch.commit().catch((error) => console.log(error));
};

export default updateUsername;
