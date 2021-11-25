import { auth, firestore } from '@lib/firebase';
import { converter } from '@lib/utils/firestore';
import { doc, updateDoc } from 'firebase/firestore';

const updateNutritionGoalsFirestore = async ({ carb, prot, fat, kcal }: Macros) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userRef = doc(firestore, `users/${uid}`).withConverter(
      converter<UserDetails>()
    );

    await updateDoc(userRef, {
      'goals.nutrition': {
        carb,
        prot,
        fat,
        kcal,
      },
    });
  } catch (error) {
    return { error };
  }
};

export default updateNutritionGoalsFirestore;
