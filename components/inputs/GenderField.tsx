import { Radios } from 'mui-rff';

interface Props {
  label: string;
  name: string;
}

const GenderField = ({ label, name }: Props) => {
  return (
    <Radios
      label={label}
      name={name}
      data={[
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Outro', value: 'O' },
      ]}
      radioGroupProps={{ row: true }}
    />
  );
};

export default GenderField;
