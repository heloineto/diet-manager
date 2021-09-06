import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';

const updateMetricsFirestore = async ({
  activityLevel,
  height,
  weight,
}: NonNullable<UserDetails['metrics']>) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update({
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
