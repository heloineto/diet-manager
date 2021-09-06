import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';

const updateGeneralGoalsFirestore = async ({
  loseWeight,
  buildMuscle,
  beHealthier,
}: NonNullable<NonNullable<UserDetails['goals']>['general']>) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update({
      'goals.general': {
        loseWeight,
        buildMuscle,
        beHealthier,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default updateGeneralGoalsFirestore;
