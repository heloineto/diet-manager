import { useState } from 'react';

import { Button } from '@material-ui/core';
import addFoodFirestore from './AddFood.firestore';
import SearchFood from '../SearchFood';

interface Props {
  className?: string;
  mealRef: FirebaseRef;
  onClose: () => void;
}

const AddFood = ({ className, onClose, mealRef }: Props) => {
  const [createOpen, setCreateOpen] = useState(false);

  const [food, setFood] = useState<Food | null>(null);

  const addFood = async () => {
    onClose();

    if (!food) return;

    await addFoodFirestore(food, mealRef);
  };

  return (
    <div className="flex flex-col space-y-2.5 md:min-w-[30rem]">
      <div className="flex flex-col space-y-2.5">
        <SearchFood selectedFood={food} setSelectedFood={setFood} />
        <p className="text-gray-700">
          Não encontrou o que estava procurando?
          <br />
          <button
            className="text-blue-500 underline font-medium"
            onClick={() => setCreateOpen(true)}
          >
            Cadastre um novo alimento.
          </button>
        </p>
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
          onClick={addFood}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default AddFood;
