import { CheckIcon } from '@heroicons/react/outline';
import { useColors } from '@lib/hooks';
import { FormControl, FormLabel, IconButton } from '@material-ui/core';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';

interface Props {
  label: string;
  name: string;
}

const ColorField = ({ label, name }: Props) => {
  const colors = useColors();

  return (
    <Field label={label} name={name}>
      {({ input }) => (
        <FormControl className="group">
          <FormLabel className="group-hover:text-blue-500">{label}</FormLabel>
          <div className="flex gap-x-4 my-2">
            {Object.entries(colors).map(([key, color]) => {
              const selected = key === input.value;

              return (
                <IconButton
                  key={key}
                  className="h-8 w-8 p-0 relative"
                  onClick={() => input.onChange(key)}
                  style={{
                    background: color[500],
                  }}
                >
                  {selected && (
                    <CheckIcon
                      className="h-6 w-auto"
                      style={{
                        color: color[900],
                      }}
                    />
                  )}
                </IconButton>
              );
            })}
          </div>
        </FormControl>
      )}
    </Field>
  );
};

export default ColorField;
