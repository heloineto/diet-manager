import type { NextPage } from 'next';

import clsx from 'clsx';

import MainShell from '@components/layout/app-shells/MainShell';
import {
  UserIcon as UserIconOutlined,
  ClipboardListIcon as ClipboardListIconOutlined,
  BellIcon as BellIconOutlined,
} from '@heroicons/react/outline';

import {
  UserIcon as UserIconSolid,
  ClipboardListIcon as ClipboardListIconSolid,
  BellIcon as BellIconSolid,
} from '@heroicons/react/solid';

import { Button, useMediaQuery, useTheme } from '@material-ui/core';
import { useMemo, useState } from 'react';
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

  const [currentCategory, setCurrentCategory] = useState(
    compact ? null : categories[0]
  );

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
      <div className="p-2.5">{renderForm()}</div>
    </MainShell>
  );
};

export default Settings;
