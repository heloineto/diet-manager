import { useContext, useState } from 'react';

import { MealsContext } from '@lib/context';
import { Button } from '@material-ui/core';

import Meal from '../Meal';
import { PlusIcon } from '@heroicons/react/outline';
import AddMeal from '@components/forms/meal/AddMeal';
import Modal from '@components/overlays/Modal';

const Meals = () => {
  const { meals } = useContext(MealsContext);
  const [addMealOpen, setAddMealOpen] = useState(false);

  const renderMealTables = () => meals.map((meal, idx) => <Meal key={idx} meal={meal} />);

  return (
    <div className="flex-grow flex flex-col">
      <div className="mb-5 grid gap-y-5">{renderMealTables()}</div>

      <Button
        className="mt-auto"
        color="primary"
        variant="outlined"
        startIcon={<PlusIcon className="h-7 w-7" />}
        onClick={() => setAddMealOpen(true)}
      >
        Adicionar Refeição
      </Button>

      <Modal
        label="Adicionar Refeição"
        open={addMealOpen}
        onClose={() => setAddMealOpen(false)}
      >
        <AddMeal onClose={() => setAddMealOpen(false)} />
      </Modal>
    </div>
  );
};

export default Meals;
