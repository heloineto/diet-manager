import Link from 'next/link';
import clsx from 'clsx';
import { Button, Drawer, IconButton } from '@material-ui/core';

import DietManagerLogo from '@components/decoration/DietManagerLogo';
import navItems from './navItems';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  current?: string;
  window?: any;
  sideBarOpen?: boolean;
  toggleSideBarOpen?: () => void;
}

const Sidebar = ({
  className,
  sideBarOpen,
  toggleSideBarOpen,
  window,
}: Props) => {
  const router = useRouter();

  const renderNavItems = () =>
    navItems.map(({ name, label, IconOutlined, IconSolid, href }) => {
      const current = router.pathname === href;
      const Icon = current ? IconSolid : IconOutlined;

      return (
        <Link key={name} href={href} aria-current={current ? 'page' : 'false'}>
          <Button
            className={clsx(
              current
                ? 'bg-primary-200 text-primary-800'
                : 'text-gray-800 hover:text-primary-800',
              'group w-full h-16 text-xs hover:bg-primary-100'
            )}
            classes={{
              label:
                'static flex flex-col items-center justify-center space-y-1',
              startIcon: 'static m-0',
            }}
            startIcon={
              <Icon
                className={clsx(
                  current
                    ? 'text-primary-900'
                    : 'text-gray-700 group-hover:text-primary-900',
                  'h-6 w-6'
                )}
                aria-hidden="true"
              />
            }
          >
            {label}
          </Button>
        </Link>
      );
    });

  return (
    <div className={className}>
      <div className="md:hidden">
        <Drawer
          container={
            window !== undefined ? () => window().document.body : undefined
          }
          variant="temporary"
          anchor={'left'}
          open={sideBarOpen}
          onClose={toggleSideBarOpen}
          classes={{
            paper: 'w-[6.5rem]',
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className="w-full py-4 flex flex-col items-center">
            <IconButton className="h-12 w-12 hover:bg-primary-100">
              <DietManagerLogo className="flex-shrink-0 flex items-center h-9 w-9" />
            </IconButton>
            <div className="flex-1 mt-2 w-full px-2 space-y-1">
              {renderNavItems()}
            </div>
          </div>
        </Drawer>
      </div>
      <div className="w-28 hidden md:block">
        <Drawer
          classes={{
            paper: 'w-28',
          }}
          variant="permanent"
          open
        >
          <div className="w-full py-4 flex flex-col items-center">
            <IconButton className="h-12 w-12 hover:bg-primary-100">
              <DietManagerLogo className="flex-shrink-0 flex items-center h-9 w-9" />
            </IconButton>
            <div className="flex-1 mt-2 w-full px-2 space-y-1">
              {renderNavItems()}
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Sidebar;
