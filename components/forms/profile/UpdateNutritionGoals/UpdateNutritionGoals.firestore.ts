import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';

const updateNutritionGoalsFirestore = async ({
  carb,
  prot,
  fat,
  kcal,
}: Macros) => {
  const uid = auth?.currentUser?.uid;

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    await userDoc.update({
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
