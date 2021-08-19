import { useContext } from 'react';
import clsx from 'clsx';

import items from './items';
import Link from 'next/link';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import { Button } from '@material-ui/core';
import { LogoutIcon } from '@heroicons/react/outline';
import { leave } from '@lib/auth';

interface Props {
  className?: string;
  current?: string;
}

const NavBar = ({ className, current }: Props) => {
  const { userDetails } = useContext(UserContext);

  return (
    <div
      className={clsx(
        className,
        'w-1/12 lg:w-3/12 flex flex-col flex-1 h-screen'
      )}
    >
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 justify-start px-2 h-10 gap-x-2">
          <DietManagerLogo />
          <DietManagerWordmark className="hidden lg:block" />
        </div>
        <nav className="mt-5 flex-1 space-y-1 pr-2" aria-label="sidebar">
          {items.map(({ name, label, href, Icon }) => {
            const isCurrent = current === name;

            return (
              <Link key={name} href={href}>
                <div
                  className={clsx(
                    isCurrent
                      ? 'bg-primary-200 text-gray-900 hover:text-gray-900 hover:bg-primary-300'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
                    'group flex items-center px-2 py-2 text-sm lg:text-base font-semibold rounded-md'
                  )}
                >
                  <Icon
                    className={clsx(
                      isCurrent
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6 lg:h-8 lg:w-8'
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-gray-200 px-2 py-4 mt-auto">
        <Button
          className="w-full"
          variant="outlined"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={leave}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
