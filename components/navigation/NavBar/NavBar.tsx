import { useContext } from 'react';
import clsx from 'clsx';

import items from './items';
import Link from 'next/link';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import { Button, Hidden, makeStyles } from '@material-ui/core';
import { LogoutIcon } from '@heroicons/react/outline';
import { leave } from '@lib/auth';

interface Props {
  className?: string;
  current?: string;
}

const NavBar = ({ className, current }: Props) => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className={clsx(className, 'flex flex-col flex-1 h-screen')}>
      <div className="flex flex-col py-5 overflow-y-auto">
        <div className="flex items-center justify-start flex-shrink-0 h-10 gap-x-2">
          <DietManagerLogo />
          <DietManagerWordmark className="hidden lg:block" />
        </div>
        <nav className="mt-5 space-y-1 pr-2" aria-label="sidebar">
          {items.map(({ name, label, href, Icon }) => {
            const isCurrent = current === name;

            return (
              <Link key={name} href={href}>
                <Hidden mdDown>
                  <Button
                    className={clsx(
                      isCurrent
                        ? 'bg-primary-200 text-primary-800 hover:text-primary-900 hover:bg-primary-300'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200',
                      'group text-base font-bold w-full'
                    )}
                    classes={{
                      label: 'static flex justify-start',
                      startIcon: 'static',
                    }}
                    startIcon={
                      <Icon
                        className={clsx(
                          isCurrent
                            ? 'text-primary-800'
                            : 'text-gray-600 group-hover:text-gray-800',
                          'mr-3 flex-shrink-0 h-6 w-6 lg:h-8 lg:w-8'
                        )}
                        aria-hidden="true"
                      />
                    }
                  >
                    {label}
                  </Button>
                </Hidden>
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
          startIcon={<LogoutIcon className="h-7 w-7" />}
          onClick={leave}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
