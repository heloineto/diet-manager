import type { NextPage } from 'next';

import clsx from 'clsx';

import MainShell from '@components/layout/app-shells/MainShell';
import {
  TrendingUpIcon as TrendingUpIconOutlined,
  UserIcon as UserIconOutlined,
  BellIcon as BellIconOutlined,
} from '@heroicons/react/outline';

import {
  UserIcon as UserIconSolid,
  TrendingUpIcon as TrendingUpIconSolid,
  BellIcon as BellIconSolid,
} from '@heroicons/react/solid';

import { Button, useMediaQuery, useTheme } from '@material-ui/core';
import { useMemo, useState } from 'react';
import UpdateAccount from '@components/forms/profile/UpdateAccount';
import UpdateGeneralGoals from '@components/forms/profile/UpdateGeneralGoals';
import UpdateNutritionGoals from '@components/forms/profile/UpdateNutritionGoals';
import UpdateMetrics from '@components/forms/profile/UpdateMetrics';

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
        IconOutlined: TrendingUpIconOutlined,
        IconSolid: TrendingUpIconSolid,
        Form: UpdateGeneralGoals,
      },
      {
        name: 'nutritionGoals',
        label: 'Metas Nutricionais',
        IconOutlined: TrendingUpIconOutlined,
        IconSolid: TrendingUpIconSolid,
        Form: UpdateNutritionGoals,
      },
      {
        name: 'metrics',
        label: 'Medidas',
        IconOutlined: TrendingUpIconOutlined,
        IconSolid: TrendingUpIconSolid,
        Form: UpdateMetrics,
      },
    ],
    []
  );

  const [currCategory, setCurrCategory] = useState(
    compact ? null : categories[0]
  );

  const renderForm = () => {
    if (!currCategory) return null;

    const { Form } = currCategory;

    return <Form />;
  };

  return (
    <MainShell
      aside={
        <div className="-m-2.5 rounded-xl overflow-hidden">
          <nav className="hidden w-full bg-white md:flex md:flex-col">
            <div className="overflow-y-auto">
              {categories.map((category) => {
                const { name, label, IconOutlined, IconSolid } = category;

                const isCurrent = name === currCategory?.name;

                const Icon = isCurrent ? IconSolid : IconOutlined;

                return (
                  <Button
                    key={name}
                    className={clsx(
                      isCurrent
                        ? 'bg-blue-300 bg-opacity-50'
                        : 'hover:bg-blue-200 hover:bg-opacity-50',
                      'w-full flex justify-start p-6 border-b border-blue-gray-200'
                    )}
                    classes={{
                      startIcon: 'static',
                    }}
                    startIcon={
                      <Icon
                        className="flex -mt-0.5 h-6 w-6 text-blue-gray-400"
                        aria-hidden="true"
                      />
                    }
                    color="secondary"
                    onClick={() => setCurrCategory(category)}
                  >
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-blue-gray-900">{label}</p>
                      <p className="mt-1 text-blue-gray-500"></p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </nav>
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
