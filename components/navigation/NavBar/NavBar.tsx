import { useContext, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@material-ui/core';
import {
  LogoutIcon,
  SearchIcon,
  BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import { leave } from '@lib/auth';
import navItems from './navItems';

interface Props {
  className?: string;
  current?: string;
}

const NotificationsBadge = ({ qnt = 0 }) => {
  return (
    <IconButton className="text-gray-700">
      <Badge badgeContent={qnt} color="secondary">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Badge>
    </IconButton>
  );
};

const NavBar = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileOpen = () => setMobileOpen((value) => !value);

  const renderNavItems = () =>
    navItems.map(({ name, label, Icon, href }) => (
      <Link key={name} href={href} aria-current={false ? 'page' : 'false'}>
        <Button
          className={clsx(
            false ? 'text-gray-900' : 'text-gray-800',
            'text-sm font-bold uppercase bg-white bg-opacity-0 hover:bg-opacity-20 px-3 py-2 w-full lg:w-min'
          )}
          classes={{
            label: 'static flex items-center justify-start lg:justify-center',
            startIcon: 'static',
          }}
          startIcon={
            <Icon
              className={clsx(
                false ? 'text-gray-900' : 'text-gray-800',
                'h-6 w-6'
              )}
            />
          }
        >
          {label}
        </Button>
      </Link>
    ));

  return (
    <header className="pb-24 bg-gradient-to-br from-green-100 to-primary-300">
      <>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative py-5 flex items-center justify-center lg:justify-between">
            {/* Logo */}
            <div className="absolute left-0 flex-shrink-0 lg:static">
              <a href="#">
                <span className="sr-only">Diet Manager Logo</span>
                <div className="flex justify-center items-center gap-x-2">
                  <DietManagerLogo className="h-10 w-10" />
                  <DietManagerWordmark className="hidden lg:block" />
                </div>
              </a>
            </div>

            {/* Right section on desktop */}
            <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
              <NotificationsBadge />

              {userDetails && (
                <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    className={clsx(
                      'font-semibold ring-white',
                      menuOpen
                        ? 'ring-4 ring-opacity-50'
                        : 'ring-2 ring-opacity-20'
                    )}
                    alt={`${userDetails.firstName} ${userDetails.lastName}`}
                    src={userDetails.photoURL ?? '/useletter.png'}
                  />
                </IconButton>
              )}

              <Menu
                classes={{
                  paper: 'transform translate-y-full',
                }}
                anchorEl={menuAnchor}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={menuOpen}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem onClick={leave}>
                  <ListItemIcon>
                    <LogoutIcon className="h-5 w-5 text-gray-700" />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </MenuItem>
              </Menu>
            </div>

            {/* Search Centered */}
            <div className="flex-1 min-w-0 px-12 lg:hidden">
              <div className="max-w-xs w-full mx-auto">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-white focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>

            {/* MenuHeadless button */}
            <div className="absolute right-0 flex-shrink-0 lg:hidden">
              {/* Mobile menu button */}
              <IconButton
                className="bg-transparent p-2 text-primary-900"
                onClick={toggleMobileOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </IconButton>
            </div>
          </div>
          <div className="hidden lg:block border-t-2 border-primary-700 border-opacity-20 py-5">
            <div className="grid grid-cols-3 gap-8 items-center">
              <div className="col-span-2">
                <nav className="flex space-x-1">{renderNavItems()}</nav>
              </div>
              {/* Search Side */}
              <div className="max-w-md w-full mx-auto">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-white focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <Modal
            className="mx-auto w-full p-2"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            aria-labelledby="Mobile menu"
            aria-describedby="Menu on small screens for navigation between pages"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
              <div className="pt-3 pb-2">
                <div className="flex items-center justify-between px-4">
                  <DietManagerLogo className="h-9 w-9" />
                  <div className="-mr-2">
                    <IconButton
                      className="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </IconButton>
                  </div>
                </div>
                <div className="mt-3 flex flex-col px-2 gap-y-1">
                  {renderNavItems()}
                </div>
              </div>
              {userDetails && (
                <div className="pt-4 pb-2">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar
                        className={clsx(
                          'font-semibold ring-white ring-2 ring-opacity-20'
                        )}
                        alt={`${userDetails.firstName} ${userDetails.lastName}`}
                        src={userDetails.photoURL ?? '/useletter.png'}
                      />
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      {userDetails.firstName && userDetails.lastName && (
                        <div className="text-base font-medium text-gray-800 truncate">
                          {`${userDetails.firstName} ${userDetails.lastName}`}
                        </div>
                      )}
                      {userDetails.email && (
                        <div className="text-sm font-medium text-gray-500 truncate">
                          {userDetails.email}
                        </div>
                      )}
                    </div>
                    <NotificationsBadge />
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Button
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800 w-full"
                      onClick={leave}
                      classes={{
                        label: 'static flex items-center justify-start',
                        startIcon: 'static',
                      }}
                      startIcon={
                        <LogoutIcon className="h-6 w-6 text-gray-700" />
                      }
                    >
                      Sair
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </>
    </header>
  );
};

export default NavBar;
