import type { Dispatch, SetStateAction } from 'react';

import Modal from '@components/overlays/Modal';
import { Button } from '@material-ui/core';

interface Props {
  open: boolean;
  onSubmit: (registeredFood?: Food | undefined) => void;
  onClose: () => void;
  onReturn: () => void;
}

const RegisterFood = ({ open, onSubmit, onClose, onReturn }: Props) => {
  return (
    <Modal label="Registrar Alimento" open={open} onClose={onClose}>
      <div className="flex flex-col space-y-2.5 lg:w-[32rem]">
        <div className="flex flex-col space-y-2.5">
          {/*  */}
          <p className="text-gray-700">
            {/* Non link text goes here */}
            <br />
            <button className="text-blue-500 underline font-medium" onClick={onReturn}>
              Pesquise um alimento.
            </button>
          </p>
        </div>
      </div>
      <div className="flex space-x-5 mt-5">
        <Button
          className="bg-gray-500 text-white w-2/6"
          variant="contained"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          className="shadow-blue-500 hover:shadow-xl-blue-500 w-4/6"
          color="secondary"
          variant="contained"
          type="submit"
        >
          Adicionar
        </Button>
      </div>
    </Modal>
  );
};

export default RegisterFood;
