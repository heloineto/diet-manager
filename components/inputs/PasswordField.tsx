import { TextField, TextFieldProps } from 'mui-rff';
import { MouseEvent, useState } from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import classNames from 'clsx';

const PasswordField = ({
  className,
  label,
  name,
  InputProps,
  ...rest
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <TextField
      className={classNames(className, 'group')}
      label={label}
      name={name}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              className="text-gray-700 hover:text-blue-600 group-focus-within:text-blue-600"
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeOffIcon className="w-5 h-5" />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...rest}
    />
  );
};

export default PasswordField;
