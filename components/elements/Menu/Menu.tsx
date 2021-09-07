import type { SVGProps } from 'react';

import { Button } from '@material-ui/core';
import clsx from 'clsx';

interface CategoryType {
  name: string;
  label: string;
  IconOutlined: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  IconSolid: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  Form: (props: { className?: string }) => JSX.Element;
}

interface Props {
  categories: CategoryType[];
  current: CategoryType | null;
  onChange: (category: CategoryType) => void;
}

const Menu = ({ categories, current, onChange }: Props) => {
  return (
    <nav className="flex flex-col overflow-y-auto">
      {categories.map((category) => {
        const { name, label, IconOutlined, IconSolid } = category;

        const isCurrent = name === current?.name;

        const Icon = isCurrent ? IconSolid : IconOutlined;

        return (
          <Button
            key={name}
            className={clsx(
              isCurrent
                ? 'bg-blue-300 bg-opacity-50'
                : 'hover:bg-blue-200 hover:bg-opacity-50',
              'w-full flex justify-start p-5 rounded-none'
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
            onClick={() => onChange(category)}
          >
            <div className="ml-3 text-base font-semibold text-blue-gray-900 text-left">
              {label}
            </div>
          </Button>
        );
      })}
    </nav>
  );
};

export default Menu;
