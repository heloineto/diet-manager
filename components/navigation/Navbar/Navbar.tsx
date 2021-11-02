import { useContext, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { LogoutIcon, MenuIcon } from '@heroicons/react/outline';
import { UserContext } from '@lib/context';
import { leave } from '@lib/auth';
import UserAvatar from '@components/decoration/UserAvatar';
import NavbarNotificationsBadge from './Navbar.NotificationsBadge';

interface Props {
  toggleSideBarOpen?: () => void;
}

const Navbar = ({ toggleSideBarOpen }: Props) => {
  const { userDetails } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  return (
    <header className="w-full relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
      <div className="flex-1 flex justify-between px-4 sm:px-6">
        <div className="my-auto">
          <IconButton
            className="h-12 w-12 lg:hidden"
            edge="start"
            onClick={toggleSideBarOpen}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </IconButton>
        </div>
        {userDetails && (
          <div className="ml-4 flex items-center sm:ml-6">
            <NavbarNotificationsBadge className="w-12 h-12" />
            <IconButton
              className="w-12 h-12 my-auto hover:bg-primary-50"
              edge="end"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <span className="sr-only">Open user menu</span>
              <UserAvatar
                className={menuOpen ? 'ring-4 ring-opacity-50' : 'ring-2 ring-opacity-20'}
              />
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
