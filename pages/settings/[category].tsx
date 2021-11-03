import MainShell from '@components/app-shells/MainShell';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Menu from '@components/elements/Menu';
import { useProfileCompletionSteps } from '@components/elements/ProfileCompletion/ProfileCompletion.hook';
import { useRouter } from 'next/router';
import { isKeyInShallowObject } from '@utils/typescript';

const Settings: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const categoryName = category && typeof category === 'string' ? category : 'account';

  const categoryNameToIndex = {
    account: 0,
    generalGoals: 1,
    nutritionGoals: 2,
    metrics: 3,
  };

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const categories = useProfileCompletionSteps();

  const [currentCategory, setCurrentCategory] = useState<null | typeof categories[0]>(
    categories[
      isKeyInShallowObject(categoryName, categoryNameToIndex)
        ? categoryNameToIndex[categoryName]
        : 0
    ]
  );

  useEffect(() => {
    if (compact) setCurrentCategory(null);
    if (!compact) setCurrentCategory(categories[0]);
  }, [compact, categories]);

  useEffect(() => {
    currentCategory &&
      router.push(`${currentCategory.name}`, undefined, { shallow: true });
  }, [currentCategory, router]);

  const renderForm = () => {
    if (!currentCategory) return null;

    const { Form } = currentCategory;

    return <Form submitButtonProps={{ innerText: 'Salvar' }} />;
  };

  return (
    <MainShell
      aside={
        <div className="-m-2.5 rounded-xl overflow-hidden">
          <Menu
            categories={categories}
            current={currentCategory}
            onChange={(category) => setCurrentCategory(category)}
          />
        </div>
      }
      asideProps={{
        size: 'large',
        position: 'left',
      }}
    >
      {compact ? (
        currentCategory ? (
          <>
            <div className="flex items-start h-12 relative">
              <IconButton
                className="-mt-2.5 absolute top-0 left-0"
                edge="start"
                onClick={() => setCurrentCategory(null)}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </IconButton>
              <div className="font-bold sm:text-xl text-gray-900 mx-auto">
                {currentCategory.label}
              </div>
            </div>
            {renderForm()}
          </>
        ) : (
          <Menu
            categories={categories}
            current={currentCategory}
            onChange={(category) => setCurrentCategory(category)}
          />
        )
      ) : (
        <div className="p-2.5">{renderForm()}</div>
      )}
    </MainShell>
  );
};

export default Settings;
