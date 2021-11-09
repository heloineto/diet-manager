import { uploadBase64Picture } from '@lib/utils/firestore';
import { serverTimestamp, updateDoc } from 'firebase/firestore';

const profilePictureEditorFirebase = async (
  userRef: FirebaseRef,
  base64Picture: string
) => {
  const photoUrl = await uploadBase64Picture(
    base64Picture,
    `users/${userRef.id}/profilePicture.jpeg`
  );

  if (!photoUrl) return;

  await updateDoc(userRef, { photoUrl, updatedAt: serverTimestamp() }).catch((error) => {
    console.log(error);
  });
};

export default profilePictureEditorFirebase;
