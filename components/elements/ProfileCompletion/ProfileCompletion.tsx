import UpdateAccount from '@components/forms/profile/UpdateAccount';
import { useProfileCompletion } from './ProfileCompletion.hook';

interface Props {}

const ProfileCompletion = (props: Props) => {
  const completed = useProfileCompletion();

  const Forms = [UpdateAccount];

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-2.5 sm:p-5 sm:bg-white sm:rounded-xl sm:border-2 sm:border-solid sm:border-gray-100 sm:shadow-sm sm:hover:shadow-xl ">
        {Forms.map((Form) => (
          <Form />
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletion;
