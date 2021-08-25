import { CheckIcon } from '@heroicons/react/outline';
import { useEffect, useMemo, useState } from 'react';
import ColorPickerSwatch from './ColorPicker.Swatch';

interface Props {
  name: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
  isErrorState: boolean;
  initialValue: string;
}

const ColorPicker = ({
  name = 'color',
  label = 'Cor',
  onChange,
  value,
  isErrorState = false,
  initialValue = 'blue',
  ...rest
}: Props) => {
  const [selectedColor, setSelectedColor] = useState(initialValue);

  useEffect(() => {
    if (onChange) {
      onChange(selectedColor);
    }
  }, [selectedColor]);

  const colors = useMemo(
    () => ['red', 'yellow', 'green', 'blue', 'purple', 'pink'],
    []
  );

  const renderSwatches = () =>
    colors.map((color) => (
      <ColorPickerSwatch
        key={color}
        color={color}
        isSelected={color === selectedColor}
        onClick={(e) => {
          e.preventDefault();
          setSelectedColor(color);
        }}
      />
    ));

  return (
    <div className="flex items-center justify-start">
      <label
        className={`m-0 pr-2 ${
          !isErrorState ? 'input-label' : 'error-input-label'
        }`}
        htmlFor={name}
        {...rest}
      >
        {label}
      </label>
      <div className="flex">{renderSwatches()}</div>
    </div>
  );
};

export default ColorPicker;
