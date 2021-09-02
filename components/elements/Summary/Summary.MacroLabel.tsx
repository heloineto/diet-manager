import { useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
  className?: string;
  name: string;
  macro: string;
  value: number;
}

const SummaryMacroLabel = ({ className, name, macro, value }: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  return (
    <div className={clsx(className, 'flex flex-col items-center')}>
      <div
        className={clsx(
          compact ? 'font-medium text-sm' : 'font-bold text-xs',
          'uppercase text-gray-500'
        )}
      >
        {name}
      </div>
      <div
        className={clsx(compact ? 'inline-flex' : 'flex flex-col items-center')}
      >
        <div
          className={clsx(
            compact ? 'font-bold' : 'font-semibold',
            'text-3xl text-gray-900'
          )}
        >
          {value}
        </div>
        <div
          className={clsx(
            compact ? 'font-normal text-3xl' : 'font-medium text-sm',
            'text-gray-700'
          )}
        >
          {macro}
        </div>
      </div>
    </div>
  );
};

export default SummaryMacroLabel;
