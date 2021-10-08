import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';
import { doc, updateDoc } from 'firebase/firestore';

const updateMetricsFirestore = async ({
  activityLevel,
  height,
  weight,
}: NonNullable<UserDetails['metrics']>) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = doc(firestore, `users/${uid}`).withConverter(
      converter<UserDetails>()
    );

    await updateDoc(userDoc, {
      metrics: {
        activityLevel,
        height,
        weight,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default updateMetricsFirestore;
