import classNames from 'clsx';
import { Avatar } from '@material-ui/core';
import { UserContext } from '@lib/context';
import { useContext } from 'react';

interface Props {
  className?: string;
}

const UserAvatar = ({ className }: Props) => {
  const { userDetails } = useContext(UserContext);

  return (
    <Avatar
      className={classNames(className, 'font-semibold ring-primary-200')}
      alt={`${userDetails?.firstName} ${userDetails?.lastName}`}
      src={userDetails?.photoURL}
    >
      {userDetails?.firstName && userDetails?.firstName.charAt(0)}
    </Avatar>
  );
};

export default UserAvatar;
