import { auth, firestore } from '@lib/firebase';
import { converter } from '@lib/utils/firestore';
import { doc, updateDoc } from 'firebase/firestore';

const updateGeneralGoalsFirestore = async ({
  loseWeight,
  buildMuscle,
  beHealthier,
}: NonNullable<NonNullable<UserDetails['goals']>['general']>) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = doc(firestore, `users/${uid}`).withConverter(
      converter<UserDetails>()
    );

    await updateDoc(userDoc, {
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
