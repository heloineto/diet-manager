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
        'lg:p-5 lg:bg-white lg:rounded-xl lg:border-2 lg:border-solid lg:border-gray-100 lg:shadow-sm lg:hover:shadow-xl'
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
