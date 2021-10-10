import {
  FormLabel,
  Slider,
  withStyles,
} from '@material-ui/core';
import { useMemo } from 'react';
import { Field } from 'react-final-form';

const StyledSlider = withStyles({
  root: {
    color: '#3b82f6',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  mark: {
    display: 'none',
  },
  markLabel: {
    marginTop: 4,
    fontWeight: 600,
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

interface Props {
  label: string;
  name: string;
}

const SliderAdapter = ({
  input,
  meta,
  label,
  options,
  ...rest
}: {
  //* We use any here because rff didn't care enough about ts
  input: any;
  meta: any;
  [x: string]: any;
}) => {
  const { title, description } = options[input.value];

  return (
    <div className="w-full group">
      <FormLabel className="group-hover:text-blue-500">{`${label}${
        title ? `: ${title}` : ''
      }`}</FormLabel>

      <StyledSlider
        {...input}
        {...rest}
        onChange={(event, value) => input.onChange(value)}
      />

      <div className="text-lg font-semibold text-center text-gray-700">{title}</div>
      <div className="text-center text-sm font-medium text-gray-600 h-10">
        {description}
      </div>
    </div>
  );
};

const ActivityLevelSlider = ({ label, name }: Props) => {
  const options = useMemo(
    () => ({
      1: {
        value: 1,
        title: 'Sedentário',
        description: 'Alguém que faz pouco ou nenhum exercício.',
      },
      2: {
        value: 2,
        title: 'Pouco Ativo',
        description:
          'Alguém que realiza exercícios leves (no nível de uma caminhada rápida) por 10-30 minutos por dia, 2-4 vezes por semana.',
      },
      3: {
        value: 3,
        title: 'Moderadamente Ativo',
        description:
          'Alguém que faz exercícios moderados por 30 minutos á 1 hora por dia, 3-5 vezes por semana.',
      },
      4: {
        value: 4,
        title: 'Muito Ativo',
        description:
          'Alguém que pratica exercícios intensos por volta de 1 hora por dia ou exercícios moderados por volta de 2 horas por dia, 5-7 vezes por semana.',
      },
      5: {
        value: 5,
        title: 'Extremamente Ativo',
        description:
          'Alguém que é um atleta profissional, ciclista competitivo ou profissional de área fitness, ou pratique exercícios intensos por pelo menos 2 horas por dia.',
      },
    }),
    []
  );

  return (
    <Field
      label={label}
      name={name}
      component={SliderAdapter}
      className=""
      defaultValue={1}
      valueLabelDisplay="auto"
      step={1}
      marks={[
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
        {
          value: 4,
          label: '4',
        },
        {
          value: 5,
          label: '5',
        },
      ]}
      min={1}
      max={5}
      options={options}
    />
  );
};

export default ActivityLevelSlider;
