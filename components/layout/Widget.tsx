import classNames from 'clsx';

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
        '-mx-2 lg:mx-0 p-2.5 bg-gray-50 lg:bg-white rounded-xl lg:border-2 lg:border-gray-100 lg:shadow-sm lg:hover:shadow-lg transition-shadow duration-500'
      )}
    >
      {children}
    </div>
  );
};

export default Widget;
