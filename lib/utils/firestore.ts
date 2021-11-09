import { storage } from '@lib/firebase';
import { QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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

export const uploadBase64Picture = async (base64Picture: string, refUrl: string) => {
  const res = await uploadString(ref(storage, refUrl), base64Picture, 'base64', {
    contentType: 'image/jpeg',
  }).catch((error) => console.log(error));

  if (res?.ref) {
    const url =
      (await getDownloadURL(res.ref).catch((error) => console.log(error))) ?? undefined;

    return url;
  }
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const convertFirebaseDates = <T>(obj: {
  [Property in keyof T]: T[Property];
}) => {
  (Object.entries(obj) as Entries<T>).forEach(([key, value]) => {
    if (value instanceof Timestamp) obj[key] = value.toDate() as any;
  });

  return obj;
};
