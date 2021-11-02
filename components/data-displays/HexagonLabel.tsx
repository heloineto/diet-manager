import { useMediaQuery, useTheme } from '@material-ui/core';
import classNames from 'clsx';

interface Props {
  label: string;
  subLabel?: string;
  value: string;
  percentage: number;
  color: string;
  backgroundColor?: string;
  size?: 'large' | 'small';
}

const HexagonLabel = ({
  label,
  value,
  subLabel,
  percentage,
  color = '#32CC0F',
  backgroundColor = '#FFFFFF',
  size = 'small',
  ...rest
}: Props) => {
  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const isLarge = size === 'large' && !compact;

  return (
    <div className={classNames('relative')}>
      <svg
        className={classNames(isLarge ? 'max-w-32 max-h-40' : '')}
        {...(isLarge
          ? { width: '100%', height: '100%', viewBox: '0 0 120 160' }
          : { width: '90', height: '115', viewBox: '0 0 90 115' })}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          d={
            isLarge
              ? 'M118.889 21.2003V138.8C118.889 143.656 115.338 148.183 109.503 149.884C97.0877 153.504 75.9173 158.889 60 158.889C44.0827 158.889 22.9123 153.504 10.4975 149.884C4.66163 148.183 1.11111 143.656 1.11111 138.8V21.2003C1.11111 16.3435 4.66164 11.8169 10.4975 10.1156C22.9123 6.49634 44.0827 1.11111 60 1.11111C75.9173 1.11111 97.0877 6.49634 109.503 10.1156C115.338 11.8169 118.889 16.3435 118.889 21.2003Z'
              : 'M88.5 18.5502V96.4498C88.5 100.574 85.9266 104.285 81.8771 105.662C72.5618 108.83 56.7942 113.5 45 113.5C33.2058 113.5 17.4382 108.83 8.12289 105.662C4.07342 104.285 1.5 100.574 1.5 96.4498V18.5502C1.5 14.426 4.07342 10.7151 8.12289 9.33787C17.4382 6.1696 33.2058 1.5 45 1.5C56.7942 1.5 72.5618 6.1696 81.8771 9.33787C85.9266 10.7151 88.5 14.426 88.5 18.5502Z'
          }
          fill="white"
          stroke={color}
          strokeWidth="3"
        />
      </svg>
      <div className="absolute top-0 w-full h-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pt-4 flex-grow">
          <div
            className={classNames(
              isLarge ? 'text-base font-bold w-32' : 'text-sm font-semibold w-20',
              'text-gray-500 text-center overflow-hidden whitespace-nowrap flex-grow overflow-ellipsis'
            )}
          >
            {label}
          </div>
          <div
            className={classNames(
              isLarge ? 'text-2xl' : 'text-xl',
              'text-gray-800 font-bold flex-grow'
            )}
          >
            {value}
          </div>
          {isLarge && subLabel && (
            <div className="font-bold text-gray-400 grid place-content-center flex-grow mb-2 text-sm">
              {subLabel}
            </div>
          )}
        </div>

        {
          //* This verification ensures that the percentage appers even if it is 0%
          typeof percentage === 'number' && (
            <div className={classNames(isLarge ? 'mb-3' : 'mb-2', 'mt-auto relative')}>
              <svg
                className={classNames(isLarge ? 'max-w-24 max-h-10' : '', '')}
                {...(isLarge
                  ? { width: '100%', height: '100%', viewBox: '0 0 100 41' }
                  : { width: '73', height: '38', viewBox: '0 0 75 40' })}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    isLarge
                      ? 'M0 14.4544C0 10.8878 2.41702 7.78552 5.89836 7.01037C15.6211 4.84554 35.3896 0.888916 50 0.888916C64.6104 0.888916 84.3789 4.84554 94.1016 7.01037C97.583 7.78552 100 10.8878 100 14.4544V27.3235C100 30.89 97.583 33.9923 94.1016 34.7675C84.3789 36.9323 64.6104 40.8889 50 40.8889C35.3896 40.8889 15.6211 36.9323 5.89837 34.7675C2.41703 33.9923 0 30.8901 0 27.3235V14.4544Z'
                      : 'M0 13.0844C0 9.746 2.12427 6.78517 5.32721 5.8439C12.8405 3.63593 26.7957 0 37.2222 0C47.6487 0 61.604 3.63592 69.1172 5.8439C72.3202 6.78517 74.4444 9.746 74.4444 13.0844V26.9156C74.4444 30.254 72.3202 33.2148 69.1172 34.1561C61.604 36.3641 47.6487 40 37.2222 40C26.7957 40 12.8405 36.3641 5.32722 34.1561C2.12428 33.2148 0 30.254 0 26.9156V13.0844Z'
                  }
                  fill={color}
                />
              </svg>
              <div
                className="absolute w-full h-full top-0 grid place-content-center font-semibold"
                style={{
                  color: `${backgroundColor}`,
                }}
              >{`${percentage}%`}</div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HexagonLabel;
