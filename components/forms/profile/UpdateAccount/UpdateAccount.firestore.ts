import { updateUsername } from '@lib/auth';
import { auth, firestore } from '@lib/firebase';
import { converter } from '@lib/utils/firestore';
import { isNil, omitBy } from 'lodash';
import { doc, updateDoc } from 'firebase/firestore';

const updateAccountFirestore = async ({
  oldUsername,
  newUsername,
  ...updates
}: UpdateAccountValuesType) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userRef = doc(firestore, `users/${uid}`).withConverter(
      converter<UserDetails>()
    );

    await updateDoc(userRef, { ...omitBy(updates, isNil) });

    if (oldUsername && newUsername) await updateUsername(uid, oldUsername, newUsername);
  } catch (error) {
    return { error };
  }
};

export default updateAccountFirestore;
