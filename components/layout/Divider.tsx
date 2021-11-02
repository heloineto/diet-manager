import classNames from 'clsx';

interface Props {
  className?: string;
  children?: ReactNode;
  classes?: {
    root?: string;
    text?: string;
    bars?: string;
  };
}

const Divider = ({ className, children, classes }: Props) => {
  return (
    <div className={classNames(className, 'flex justify-evenly items-center')}>
      <div className={classNames(classes?.bars, 'h-0.5 bg-gray-300 w-full')} />
      <div
        className={classNames(
          classes?.text,
          'text-gray-400 uppercase font-bold text-xs mx-5 whitespace-nowrap'
        )}
      >
        {children}
      </div>
      <div className={classNames(classes?.bars, 'h-0.5 bg-gray-300 w-full')} />
    </div>
  );
};

export default Divider;
