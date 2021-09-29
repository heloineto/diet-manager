import { CheckIcon } from '@heroicons/react/outline';
import { FormControl, FormLabel, IconButton } from '@material-ui/core';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';

interface Props {
  label: string;
  name: string;
}

const ColorField = ({ label, name }: Props) => {
  const colors = useMemo(
    () => ({
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      yellow: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      green: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
      },
      purple: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
      },
    }),
    []
  );

  return (
    <Field label={label} name={name}>
      {({ input }) => (
        <FormControl className="group">
          <FormLabel className="group-hover:text-blue-500 mb-2">{label}</FormLabel>
          <div className="flex gap-x-4">
            {Object.entries(colors).map(([key, color]) => {
              const selected = color[100] === input.value;

              return (
                <IconButton
                  key={key}
                  className="h-8 w-8 p-0 relative"
                  onClick={() => input.onChange(color[100])}
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
