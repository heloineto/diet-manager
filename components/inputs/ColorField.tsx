import { Radios } from 'mui-rff';
import React from 'react';

interface Props {
  label: string;
  name: string;
}

const ColorField = ({ label, name }: Props) => {
  const colors = [
    { label: 'red', value: '#fef2f2' },
    { label: 'yellow', value: '#fffbeb' },
    { label: 'green', value: '#ecfdf5' },
    { label: 'blue', value: '#eff6ff' },
    { label: 'indigo', value: '#eef2ff' },
    { label: 'purple', value: '#f5f3ff' },
    { label: 'pink', value: '#fdf2f8' },
  ];

  return (
    <Radios label={label} name={name} data={colors} radioGroupProps={{ row: true }} />
  );
};

export default ColorField;
