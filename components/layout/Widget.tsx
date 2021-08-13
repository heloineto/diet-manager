import classNames from 'classnames';
import type { ReactNode } from 'react';

import React from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Widget = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        className,
        'sm:p-5 sm:bg-white sm:rounded-xl sm:border-2 sm:border-solid sm:border-gray-100 sm:shadow-sm sm:hover:shadow-xl'
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
