import { useState } from 'react';

import { Button } from '@material-ui/core';
import addFoodFirestore from './AddFood.firestore';
import SearchFood from '../SearchFood';
import ModalWithAside from '@components/overlays/ModalWithAside';
import RegisterFood from '../RegisterFood';

interface Props {
  className?: string;
  mealRef: FirebaseRef;
  open: boolean;
  onClose: () => void;
}

const AddFood = ({ className, open, onClose, mealRef }: Props) => {
  const [registerOpen, setRegisterOpen] = useState(false);

  const [food, setFood] = useState<Food | null>(null);

  const addFood = async () => {
    onClose();

    if (!food) return;

    await addFoodFirestore(food, mealRef);
  };

  if (registerOpen)
    return (
      <RegisterFood
        open={registerOpen}
        onSubmit={(registeredFood?: Food) => {
          if (!registeredFood) {
            onClose();
            return;
          }

          setFood(registeredFood);
          addFood();
        }}
        onReturn={() => setRegisterOpen(false)}
        onClose={onClose}
      />
    );

  return (
    <ModalWithAside
      label="Adicionar Alimento"
      open={open}
      onClose={onClose}
      actions={
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
            onClick={addFood}
          >
            Adicionar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col space-y-2.5 lg:w-[32rem]">
        <div className="flex flex-col space-y-2.5">
          <SearchFood selectedFood={food} setSelectedFood={setFood} />
          <p className="text-gray-700">
            Não encontrou o que estava procurando?
            <br />
            <button
              className="text-blue-500 underline font-medium"
              onClick={() => setRegisterOpen(true)}
            >
              Cadastre um novo alimento.
            </button>
          </p>
        </div>
      </div>
    </ModalWithAside>
  );
};

export default AddFood;
