import { Button } from '@material-ui/core';
import classNames from 'clsx';

interface CategoryType {
  name: string;
  label: string;
  IconOutlined: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  IconSolid: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

interface Props<T = CategoryType & any> {
  categories: T[];
  current: T | null;
  onChange: (category: T) => void;
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
            className={classNames(
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
