import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import { ArrowLeftIcon } from '@heroicons/react/outline';

import { Button, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import Menu from '@components/elements/Menu';
import { useProfileCompletionSteps } from '@components/elements/ProfileCompletion/ProfileCompletion.hook';

const Settings: NextPage = () => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const categories = useProfileCompletionSteps();

  const [currentCategory, setCurrentCategory] = useState<
    null | typeof categories[0]
  >(categories[0]);

  useEffect(() => {
    if (compact) setCurrentCategory(null);
    if (!compact) setCurrentCategory(categories[0]);
  }, [compact]);

  const renderForm = () => {
    if (!currentCategory) return null;

    const { Form } = currentCategory;

    return <Form />;
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
