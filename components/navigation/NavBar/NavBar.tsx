import { useContext, useState } from 'react';
import clsx from 'clsx';

import items from './items';
import Link from 'next/link';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';
import { UserContext } from '@lib/context';
import {
  Avatar,
  Badge,
  Button,
  Hidden,
  IconButton,
  makeStyles,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { LogoutIcon } from '@heroicons/react/outline';
import { leave } from '@lib/auth';

import { Fragment } from 'react';
import { Menu as MenuHeadless, Popover, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

const user = {
  name: 'Chelsea Hagon',
  handle: 'chelseahagon',
  email: 'chelseahagon@example.com',
  role: 'Human Resources Manager',
  imageId: '1550525811-e5869dd03032',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navLinks = [
  { title: 'Home', active: true },
  { title: 'Profile', active: false },
  { title: 'Resources', active: false },
  { title: 'Company Directory', active: false },
  { title: 'Openings', active: false },
];

interface Props {
  className?: string;
  current?: string;
}

//! Convert to material
const NavBar = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log('RUN');

    setAnchorEl(event.currentTarget);
  };

  return (
    <Popover as="header" className="pb-24 bg-gray-400">
      {({ open }) => (
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
                <IconButton>
                  <Badge badgeContent={0} color="secondary">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </Badge>
                </IconButton>

                {userDetails && (
                  <IconButton onClick={handleMenu}>
                    <span className="sr-only">Open user menu</span>
                    {console.log(userDetails)}
                    <Avatar
                      className="font-semibold ring-2 ring-white ring-opacity-20"
                      alt={`${userDetails.firstName} ${userDetails.lastName}`}
                      src={userDetails.photoURL ?? '/useletter.png'}
                    ></Avatar>
                  </IconButton>
                )}

                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={leave}>
                    <ListItemIcon>
                      <LogoutIcon className="h-5 w-5 text-gray-700" />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                  </MenuItem>
                </Menu>
              </div>

              {/* Search */}
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
                <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
            <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
              <div className="grid grid-cols-3 gap-8 items-center">
                <div className="col-span-2">
                  <nav className="flex space-x-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.title}
                        href="#"
                        className={clsx(
                          link.active ? 'text-white' : 'text-indigo-100',
                          'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                        )}
                        aria-current={link.active ? 'page' : 'false'}
                      >
                        {link.title}
                      </a>
                    ))}
                  </nav>
                </div>
                <div>
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
          </div>

          <Transition.Root show={open} as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay
                  static
                  className="z-20 fixed inset-0 bg-black bg-opacity-25"
                />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Home
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Profile
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Resources
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Company Directory
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Openings
                        </a>
                      </div>
                    </div>
                    <div className="pt-4 pb-2">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="text-base font-medium text-gray-800 truncate">
                            Rebecca Nicholas
                          </div>
                          <div className="text-sm font-medium text-gray-500 truncate">
                            rebecca.nicholas@example.com
                          </div>
                        </div>
                        <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
};

export default NavBar;
