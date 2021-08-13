import type { ReactNode } from 'react';

import classNames from 'classnames';

interface Props {
  className?: string;
  children?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

const Divider = ({
  className,
  children,
  orientation = 'horizontal',
}: Props) => {
  return (
    <div className={classNames(className, 'flex justify-evenly items-center')}>
      <div className={'h-0.5 bg-gray-300 w-full'} />
      <div
        className={
          'text-gray-400 uppercase font-bold text-xs mx-5 whitespace-nowrap'
        }
      >
        {children}
      </div>
      <div className={'h-0.5 bg-gray-300 w-full'} />
    </div>
  );
};

export default Divider;
