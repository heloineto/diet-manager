import type { CSSProperties } from 'react';

import clsx from 'clsx';

const SummaryBar = ({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) => {
  return (
    <div
      className={clsx(
        className,
        'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center'
      )}
      style={style}
    />
  );
};

export default SummaryBar;
