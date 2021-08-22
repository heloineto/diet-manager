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
    <div className="hidden w-28 bg-indigo-700 overflow-y-auto md:block">
      <div className="w-full py-6 flex flex-col items-center">
        <div className="flex-shrink-0 flex items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
            alt="Workflow"
          />
        </div>
        <div className="flex-1 mt-6 w-full px-2 space-y-1">
          {sidebarNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-white'
                    : 'text-indigo-300 group-hover:text-white',
                  'h-6 w-6'
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
