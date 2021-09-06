import { auth, firestore } from '@lib/firebase';
import { converter } from '@utils/firestore';
import { isNil, omitBy } from 'lodash';

const updateNutritionGoalsFirestore = async ({
  carb,
  prot,
  fat,
  kcal,
}: Macros) => {
  const uid = auth?.currentUser?.uid;
  console.log('LOL');

  if (!uid) return { error: 'verifique se você está logado' };

  try {
    const userDoc = firestore
      .collection('users')
      .doc(uid)
      .withConverter(converter<UserDetails>());

    console.log('LOL');

    await userDoc.update({
      'goals.nutrition': {
        carb,
        prot,
        fat,
        kcal,
      },
    });
    console.log('LOL');
  } catch (error) {
    return { error };
  }
};

export default updateNutritionGoalsFirestore;
