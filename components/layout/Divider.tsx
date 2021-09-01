import type { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
  className?: string;
  children?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  classes?: {
    root?: string;
    text?: string;
    bars?: string;
  };
}

const Divider = ({
  className,
  children,
  orientation = 'horizontal',
  classes,
}: Props) => {
  return (
    <div className={clsx(className, 'flex justify-evenly items-center')}>
      <div className={clsx(classes?.bars, 'h-0.5 bg-gray-300 w-full')} />
      <div
        className={clsx(
          classes?.text,
          'text-gray-400 uppercase font-bold text-xs mx-5 whitespace-nowrap'
        )}
      >
        {children}
      </div>
      <div className={clsx(classes?.bars, 'h-0.5 bg-gray-300 w-full')} />
    </div>
  );
};

export default Divider;
