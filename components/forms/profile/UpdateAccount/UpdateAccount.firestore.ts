import { updateUsername } from '@lib/auth';
import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';
import { isNil, omitBy } from 'lodash';

const updateAccountFirestore = async ({
  oldUsername,
  newUsername,
  ...updates
}: UpdateAccountValuesType) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update(omitBy(updates, isNil));

    if (oldUsername && newUsername)
      await updateUsername(uid, oldUsername, newUsername);
  } catch (error) {
    return { error };
  }
};

export default updateAccountFirestore;
