import { KeyboardDatePicker, Radios } from 'mui-rff';
import React from 'react';
import { Form } from 'react-final-form';

interface Props {}

const UpdateAccount = (props: Props) => {
  return (
    <Form
      onSubmit={() => {}}
      // @ts-ignore
      validate={makeValidate(registerSchema)}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
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
        </form>
      )}
    </Form>
  );
};

export default UpdateAccount;
