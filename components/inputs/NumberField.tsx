import type { FilledInputProps, InputProps, OutlinedInputProps } from '@material-ui/core';
import type { FieldProps } from 'react-final-form';
import type { TextFieldProps } from 'mui-rff';

import { TextField } from 'mui-rff';

interface Props {
  label: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  fieldProps?: Partial<FieldProps<any, any, HTMLElement>> | undefined;
  InputProps?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>;
}

const NumberField = ({
  label,
  name,
  min,
  max,
  step = 1,
  fieldProps,
  InputProps,
  ...rest
}: Props & TextFieldProps) => {
  return (
    <TextField
      label={label}
      name={name}
      type="number"
      autoComplete="off"
      fieldProps={{
        parse: (value) => {
          if (min && Number(value) < min) return String(min);
          if (max && Number(value) > max) return String(max);

          return value;
        },
        ...fieldProps,
      }}
      InputProps={{
        inputProps: {
          min: min,
          max: max,
          step: String(step),
        },
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default NumberField;
