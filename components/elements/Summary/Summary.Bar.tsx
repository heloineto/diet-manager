import classNames from 'clsx';

const SummaryBar = ({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) => {
  return (
    <div
      className={classNames(
        className,
        'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center'
      )}
      style={style}
    />
  );
};

export default SummaryBar;
