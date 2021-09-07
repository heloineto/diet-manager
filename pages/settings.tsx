import type { NextPage } from 'next';

import MainShell from '@components/layout/app-shells/MainShell';
import {
  UserIcon as UserIconOutlined,
  ClipboardListIcon as ClipboardListIconOutlined,
  BellIcon as BellIconOutlined,
  ArrowLeftIcon,
} from '@heroicons/react/outline';

import {
  UserIcon as UserIconSolid,
  ClipboardListIcon as ClipboardListIconSolid,
  BellIcon as BellIconSolid,
} from '@heroicons/react/solid';

import { Button, IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import UpdateAccount from '@components/forms/profile/UpdateAccount';
import UpdateGeneralGoals from '@components/forms/profile/UpdateGeneralGoals';
import UpdateNutritionGoals from '@components/forms/profile/UpdateNutritionGoals';
import UpdateMetrics from '@components/forms/profile/UpdateMetrics';

import TargetIconSolid from '@components/icons/TargetIconSolid';
import TargetIconOutlined from '@components/icons/TargetIconOutlined';
import ForkKnifeIconOutlined from '@components/icons/ForkKnifeIconOutlined';
import ForkKnifeIconSolid from '@components/icons/ForkKnifeIconSolid';
import Menu from '@components/elements/Menu';

const Settings: NextPage = () => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const categories = useMemo(
    () => [
      {
        name: 'account',
        label: 'Conta',
        IconOutlined: UserIconOutlined,
        IconSolid: UserIconSolid,
        Form: UpdateAccount,
      },
      {
        name: 'generalGoals',
        label: 'Metas Gerais',
        IconOutlined: TargetIconOutlined,
        IconSolid: TargetIconSolid,
        Form: UpdateGeneralGoals,
      },
      {
        name: 'nutritionGoals',
        label: 'Metas Nutricionais',
        IconOutlined: ForkKnifeIconOutlined,
        IconSolid: ForkKnifeIconSolid,
        Form: UpdateNutritionGoals,
      },
      {
        name: 'metrics',
        label: 'Medidas',
        IconOutlined: ClipboardListIconOutlined,
        IconSolid: ClipboardListIconSolid,
        Form: UpdateMetrics,
      },
    ],
    []
  );

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
