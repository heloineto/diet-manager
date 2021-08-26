import { Field, Form } from 'react-final-form';

import { arrayUnion, serverTimestamp } from '@lib/firebase';
import { useState } from 'react';

import SearchFood from './SearchFood';
import CreateFood from './CreateFood';
import { Button } from '@material-ui/core';
import addFoodFirestore from './AddFood.firestore';

interface Props {
  className?: string;
  mealRef: FirebaseRef;
  onClose: () => void;
}

const AddFood = ({ className, onClose, mealRef }: Props) => {
  const [createOpen, setCreateOpen] = useState(false);

  const [food, setFood] = useState<Food | null>();

  const addFood = async () => {
    onClose();

    if (!food) return;

    await addFoodFirestore(food, mealRef);
  };

  return (
    <div className="flex flex-col def-gap-y">
      <div className="flex flex-col def-gap-y">
        {/* <AddFoodSearch /> */}
        <p className="text-gray-700">
          Não encontrou o que estava procurando? <br />
          <button
            className="text-blue-500 underline font-medium"
            onClick={() => setCreateOpen(true)}
          >
            Cadastre um novo alimento.
          </button>
        </p>
      </div>

      <Button onClick={addFood}>Adicionar Alimento</Button>
    </div>
  );
};

export default AddFood;
