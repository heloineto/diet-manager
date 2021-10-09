import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { auth, firestore } from '@lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const useUserData = () => {
  const [user, loading] = useAuthState(auth);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userRef = doc(firestore, `users/${user.uid}`);

      unsubscribe = onSnapshot(userRef, (userDoc) => {
        const userDocData = userDoc.data();
        if (!userDocData) return;

        setUserDetails(userDocData);
      });
    } else {
      setUserDetails({});
    }

    return unsubscribe;
  }, [user]);

  return { user, loading, userDetails };
};

export default useUserData;
