import { useEffect, useState } from 'react';
import { auth, firestore } from '@lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { convertFirebaseDates } from '@lib/utils/firestore';

const useUserData = () => {
  const [user, loading] = useAuthState(auth);

  const [userDetails, setUserDetails] = useState<UserDetailsWithRef | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userRef = doc(firestore, `users/${user.uid}`);

      unsubscribe = onSnapshot(userRef, (userDoc) => {
        const userDocData = userDoc.data();

        if (!userDocData) return;

        setUserDetails({ ...convertFirebaseDates(userDocData), ref: userRef });
      });
    } else {
      setUserDetails(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, loading, userDetails };
};

export default useUserData;
