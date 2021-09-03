import UpdateAccount from '@components/forms/profile/UpdateAccount';
import { useProfileCompletion } from './ProfileCompletion.hook';

interface Props {}

const ProfileCompletion = (props: Props) => {
  const completed = useProfileCompletion();

  const Forms = [UpdateAccount];

  return (
    <div>
      {Forms.map((Form) => (
        <Form />
      ))}
    </div>
  );
};

export default ProfileCompletion;
