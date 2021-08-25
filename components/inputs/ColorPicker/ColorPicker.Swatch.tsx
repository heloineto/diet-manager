import { CheckIcon } from '@heroicons/react/outline';
import { useState } from 'react';

const ColorPickerSwatch = ({ color, twSize = 7, isSelected, ...rest }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      className={`grid place-content-center rounded-full
      ${isSelected ? `border-${color}-300` : `border-${color}-200`}
      `}
      style={{
        height: `${twSize * 4 + 12}px`,
        width: `${twSize * 4 + 12}px`,
        borderWidth: isHover || isSelected ? '5px' : '0px',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...rest}
    >
      <div
        className={`grid place-content-center h-${twSize} w-${twSize} bg-${color}-500 rounded-full ${
          isHover ? '' : ''
        }`}
      >
        {isSelected && <CheckIcon className={`text-${color}-900`} />}
      </div>
    </button>
  );
};

export default ColorPickerSwatch;
