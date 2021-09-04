import UpdateAccount from '@components/forms/profile/UpdateAccount';
import UpdateNutritionGoals from '@components/forms/profile/UpdateNutritionGoals';
import { useProfileCompletion } from './ProfileCompletion.hook';

interface Props {}

const ProfileCompletion = (props: Props) => {
  const completed = useProfileCompletion();

  const Forms = [UpdateAccount, UpdateNutritionGoals];

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-2.5 sm:p-5 sm:bg-white sm:rounded-xl sm:border-2 sm:border-solid sm:border-gray-100 sm:shadow-sm sm:hover:shadow-xl w-full sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 max-w-[44rem]">
        {Forms.map((Form, idx) => idx == 1 && <Form key={idx} />)}
      </div>
    </div>
  );
};

export default ProfileCompletion;
