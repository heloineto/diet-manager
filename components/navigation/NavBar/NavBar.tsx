import type { Theme } from '@material-ui/core';

import { useState } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';

import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/outline';

import items from './items';
import Link from 'next/link';

import DietManagerWordmark from '@components/decoration/DietManagerWordmark';
import DietManagerLogo from '@components/decoration/DietManagerLogo';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

interface Props {
  className?: string;
  current?: string;
}

const NavBar = ({ className, current }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="w-1/12 lg:w-3/12">
      <div className="flex flex-col flex-1 border-r border-gray-200 h-screen">
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
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Tom Cook
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{<AdjustmentsIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default NavBar;
