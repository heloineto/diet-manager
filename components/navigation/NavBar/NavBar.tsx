import { useContext } from 'react';
import clsx from 'clsx';

import items from './items';
import Link from 'next/link';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import { Button, Hidden, IconButton, makeStyles } from '@material-ui/core';
import { LogoutIcon } from '@heroicons/react/outline';
import { leave } from '@lib/auth';

interface Props {
  className?: string;
  current?: string;
}

const NavBar = ({ className, current }: Props) => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className={clsx(className, ' h-screen')}>
      <div className="flex flex-col py-5">
        <div className="flex items-center justify-end lg:justify-start flex-shrink-0 h-10 gap-x-2 px-2">
          <DietManagerLogo className="h-9 w-9 -ml-1" />
          <DietManagerWordmark className="hidden lg:block" />
        </div>
        <header className="flex flex-col mt-5 gap-y-1" aria-label="sidebar">
          {items.map(({ name, label, href, Icon }) => {
            const isCurrent = current === name;

            return (
              <Link key={name} href={href}>
                <>
                  <Button
                    className={clsx(
                      isCurrent
                        ? 'bg-primary-200 text-primary-800 hover:text-primary-900 hover:bg-primary-300'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200',
                      'hidden lg:block group text-base font-bold w-full'
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
                          'mr-2 flex-shrink-0 h-6 w-6 lg:h-8 lg:w-8'
                        )}
                        aria-hidden="true"
                      />
                    }
                  >
                    {label}
                  </Button>

                  <IconButton
                    className={clsx(
                      isCurrent
                        ? 'bg-primary-200 text-primary-800 hover:text-primary-900 hover:bg-primary-300'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200',
                      'block lg:hidden group text-base font-bold h-14 w-14 ml-auto'
                    )}
                  >
                    <Icon
                      className={clsx(
                        isCurrent
                          ? 'text-primary-800'
                          : 'text-gray-600 group-hover:text-gray-800',
                        'h-8 w-8'
                      )}
                      aria-hidden="true"
                    />
                  </IconButton>
                </>
              </Link>
            );
          })}
        </header>
      </div>
      <div className="my-5 mt-auto">
        <Button
          className="hidden lg:block w-full"
          variant="outlined"
          color="secondary"
          startIcon={<LogoutIcon className="h-7 w-7" />}
          onClick={leave}
        >
          Sair
        </Button>
        <IconButton
          className="block lg:hidden h-14 w-14 ml-auto"
          color="secondary"
        >
          <LogoutIcon className="h-8 w-8 -mr-1" />
        </IconButton>
      </div>
    </div>
  );
};

export default NavBar;
