import { KeyboardDatePicker, Radios } from 'mui-rff';
import React from 'react';

interface Props {}

//   birthdate?: Date;
//   firstName?: string;
//   lastName?: string;
//   gender?: 'M' | 'F' | 'O';

const BaseInfo = (props: Props) => {
  return (
    <div className="flex space-y-3 my-5">
      <KeyboardDatePicker
        label="Data de nascimento"
        name="birthdate"
        format="dd/MM/yyyy"
        placeholder="dd/mm/yyyy"
      />
      <Radios
        label="Gênero"
        name="gender"
        data={[
          { label: 'Masculino', value: 'M' },
          { label: 'Feminino', value: 'F' },
          { label: 'Outro', value: 'O' },
        ]}
        radioGroupProps={{ row: true }}
      />
    </div>
  );
};

export default BaseInfo;
