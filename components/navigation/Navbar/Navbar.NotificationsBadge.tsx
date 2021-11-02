import classNames from 'clsx';
import { Badge, IconButton } from '@material-ui/core';
import { BellIcon } from '@heroicons/react/outline';

interface Props {
  className: string;
  qnt?: number;
}

const NotificationsBadge = ({ className, qnt = 0 }: Props) => {
  return (
    <IconButton className={classNames(className, 'text-gray-700')}>
      <Badge badgeContent={qnt} color="secondary">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Badge>
    </IconButton>
  );
};

export default NotificationsBadge;
