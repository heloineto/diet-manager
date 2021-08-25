import clsx from 'clsx';
import type { ReactNode } from 'react';

import React from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Widget = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        className,
        '-mx-2 lg:mx-0 p-2.5 bg-gray-50 lg:bg-white rounded-xl lg:border-2 lg:border-gray-100 lg:shadow-sm lg:hover:shadow-xl'
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
