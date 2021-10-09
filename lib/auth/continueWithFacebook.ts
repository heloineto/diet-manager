import { FacebookAuthProvider, signInWithPopup } from '@firebase/auth';

import { auth } from '@lib/firebase';

const continueWithFacebook = async () => {
  const res = await signInWithPopup(auth, new FacebookAuthProvider());

  console.log(res);
};

export default continueWithFacebook;
