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
import { Dialog } from '@headlessui/react';

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

interface Props {
  className?: string;
  current?: string;
}

const Sidebar = ({ className }: Props) => {
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
            false
              ? 'bg-primary-600 text-white'
              : 'text-gray-800 hover:bg-primary-600 hover:text-white',
            'group w-full  p-3 text-xs uppercase'
          )}
          classes={{
            label:
              'static flex flex-col items-center justify-center break-words break-all',
            startIcon: 'static m-0',
          }}
          startIcon={
            <Icon
              className={clsx(
                false ? 'text-white' : 'text-gray-700 group-hover:text-white',
                'h-6 w-6'
              )}
              aria-hidden="true"
            />
          }
        >
          {label}
        </Button>
      </Link>
    ));

  return (
    <>
      <div className="hidden w-28 bg-white border-r-2 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="">
            <DietManagerLogo className=" flex-shrink-0 flex items-center h-9 w-9" />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {renderNavItems()}
          </div>
        </div>
      </div>
      <Dialog
        as="div"
        static
        className="md:hidden"
        open={mobileOpen}
        onClose={setMobileOpen}
      >
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />

          <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
            <div className="absolute top-1 right-0 -mr-14 p-1">
              <button
                type="button"
                className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setMobileOpen(false)}
              >
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                <span className="sr-only">Close sidebar</span>
              </button>
            </div>

            <div className="flex-shrink-0 px-4 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt="Workflow"
              />
            </div>
            <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
              <nav className="h-full flex flex-col">
                <div className="space-y-1">
                  {sidebarNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        item.current
                          ? 'bg-indigo-800 text-white'
                          : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                        'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={clsx(
                          item.current
                            ? 'text-white'
                            : 'text-indigo-300 group-hover:text-white',
                          'mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;
