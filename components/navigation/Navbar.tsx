import { useContext, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Dialog, Menu, Transition } from '@headlessui/react';

import {
  Avatar,
  Badge,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@material-ui/core';

import {
  LogoutIcon,
  SearchIcon,
  BellIcon,
  MenuIcon,
} from '@heroicons/react/outline';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import { leave } from '@lib/auth';
import navItems from './navItems';

import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline';

const sidebarNavigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'All Files', href: '#', icon: ViewGridIcon, current: false },
  { name: 'Photos', href: '#', icon: PhotographIcon, current: true },
  { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Albums', href: '#', icon: CollectionIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

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

interface Props {
  className?: string;
  current?: string;
}

const Navbar = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between px-4 sm:px-6">
          <div className="flex-1 flex">
            <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="search-field"
                  id="search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            {/* <Menu as="div" className="relative flex-shrink-0">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </>
              )}
            </Menu> */}

            <button
              type="button"
              className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Add file</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
