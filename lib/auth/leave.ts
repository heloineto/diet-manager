import { auth } from '@lib/firebase';

const leave = async () => {
  await auth.signOut();
};

export default leave;
