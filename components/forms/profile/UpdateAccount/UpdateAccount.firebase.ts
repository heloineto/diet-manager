import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';

const updateAccountFirestore = async (updates: UpdateAccountValuesType) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update(updates);
  } catch (error) {
    return { error };
  }
};

export default updateAccountFirestore;
