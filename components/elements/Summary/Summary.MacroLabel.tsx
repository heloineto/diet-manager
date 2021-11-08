import classNames from 'clsx';
import { round } from 'lodash';

interface Props {
  className?: string;
  name: string;
  macro: string;
  value: number;
}

const SummaryMacroLabel = ({ className, name, macro, value }: Props) => {
  return (
    <div className={classNames(className, 'flex flex-col items-center')}>
      <div className="font-bold text-xs uppercase text-gray-500">{name}</div>
      <div className="flex flex-col items-center">
        <div className="font-semibold text-3xl text-gray-900">{round(value, 2)}</div>
        <div className="font-medium text-sm text-gray-700">{macro}</div>
      </div>
    </div>
  );
};

export default SummaryMacroLabel;
