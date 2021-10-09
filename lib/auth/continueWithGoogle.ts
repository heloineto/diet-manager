import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

import { auth } from '@lib/firebase';

const continueWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());

    console.log(res);
    //! FIREBASE UPDATED, AND THIS IS A MESS...
    // if (res.additionalUserInfo) {
    //   const { profile, isNewUser } = res.additionalUserInfo as {
    //     isNewUser: boolean;
    //     profile: {
    //       given_name?: string;
    //       family_name?: string;
    //       email?: string;
    //       picture?: string;
    //       verified_email?: boolean;
    //     };
    //   };

    //   const uid = res.user?.uid;

    //   if (uid && profile && isNewUser) {
    //     const userDoc = doc(firestore, `users\${uid}`).withConverter(
    //       converter<UserDetails>()
    //     );

    //     const userDetails = {
    //       firstName: profile.given_name,
    //       lastName: profile.family_name,
    //       email: profile.email,
    //       photoURL: profile.picture,
    //     };

    //     await setDoc(userDoc, userDetails);

    //     await registerUsername(uid, `${userDetails.firstName} ${userDetails.lastName}`);
    //   }
    // }
  } catch (error) {
    console.error(error);
  }
};

export default continueWithGoogle;
