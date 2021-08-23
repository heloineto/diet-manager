import { useContext, useState } from 'react';
import clsx from 'clsx';

import {
  Avatar,
  Badge,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@material-ui/core';

import { LogoutIcon, BellIcon, MenuIcon } from '@heroicons/react/outline';

import { UserContext } from '@lib/context';
import { leave } from '@lib/auth';

const NotificationsBadge = ({
  className,
  qnt = 0,
}: {
  className: string;
  qnt?: number;
}) => {
  return (
    <IconButton className={clsx(className, 'text-gray-700')}>
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
  toggleSideBarOpen?: () => void;
}

const Navbar = ({ className, toggleSideBarOpen }: Props) => {
  const { userDetails } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  return (
    <header className="w-full relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <div className="flex-1 flex justify-between px-4 sm:px-6">
        <div className="my-auto">
          <IconButton
            className="h-12 w-12 md:hidden"
            edge="start"
            onClick={toggleSideBarOpen}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </IconButton>
        </div>
        {userDetails && (
          <div className="ml-4 flex items-center sm:ml-6">
            <NotificationsBadge className="w-12 h-12" />
            <IconButton
              className="w-12 h-12 my-auto hover:bg-primary-50"
              edge="end"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <span className="sr-only">Open user menu</span>
              <Avatar
                className={clsx(
                  'font-semibold ring-primary-200',
                  menuOpen ? 'ring-4 ring-opacity-50' : 'ring-2 ring-opacity-20'
                )}
                alt={`${userDetails.firstName} ${userDetails.lastName}`}
                src={userDetails.photoURL}
              >
                {userDetails.firstName && userDetails.firstName.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              getContentAnchorEl={null}
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
        )}
      </div>
    </header>
  );
};

export default Navbar;
