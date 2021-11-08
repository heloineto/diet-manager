import type { QueryDocumentSnapshot } from 'firebase/firestore';

import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@lib/firebase';

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T,
});

export const docExists = async (docPath: string) => {
  const currDoc = doc(firestore, docPath);
  return (await getDoc(currDoc)).exists();
};
