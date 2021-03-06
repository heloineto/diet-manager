import Modal from '@components/overlays/Modal';
import { Button, InputAdornment } from '@material-ui/core';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import NumberField from '@components/inputs/NumberField';
import { useMacrosInfo } from '@lib/hooks';
import useRegisterFoodDecorators from './RegisterFood.decorators';

interface Props {
  open: boolean;
  onSubmit: (registeredFood?: Food | undefined) => void;
  onClose: () => void;
  onReturn: () => void;
}

const RegisterFood = ({ open, onSubmit, onClose, onReturn }: Props) => {
  const { carbInfo, protInfo, fatInfo, kcalInfo } = useMacrosInfo();
  const decorators = useRegisterFoodDecorators();

  const registerFood = async () => {};

  return (
    <Modal label="Cadastrar Alimento" open={open} onClose={onClose}>
      <Form
        onSubmit={registerFood}
        //! Add validation
        decorators={decorators}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5 lg:w-[32rem]">
            <TextField
              label="Título"
              name="label"
              placeholder="Adicionar Título"
              size="medium"
              autoFocus
              autoComplete="off"
            />
            <div className="flex flex-col sm:flex-row gap-x-1 gap-y-2.5 sm:gap-y-0 sm:gap-x-2.5">
              {[carbInfo, protInfo, fatInfo].map(({ label, key }) => (
                <div
                  key={key}
                  className="w-full flex sm:flex-col gap-x-1 sm:gap-x-0 sm:gap-y-5"
                >
                  <NumberField
                    label={label}
                    name={key}
                    min={0}
                    step={0.01}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <NumberField
                label={kcalInfo.label}
                name={kcalInfo.key}
                min={0}
                step={0.01}
                InputProps={{
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}
              />
            </div>
            <p className="text-gray-700">
              Quer verificar se esse alimento já existe sistema?
              <br />
              <button
                className="text-blue-500 underline font-medium"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  onReturn();
                }}
              >
                Pesquise um alimento.
              </button>
            </p>
            <div className="flex space-x-5 mt-5">
              <Button
                className="bg-gray-500 text-white w-2/6"
                variant="contained"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                className="shadow-blue-500 hover:shadow-xl-blue-500 w-4/6"
                color="secondary"
                variant="contained"
                type="submit"
                disabled={submitting}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};

export default RegisterFood;
