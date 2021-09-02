import { useContext, useState } from 'react';
import { pick } from 'lodash';

import { MealsContext } from '@lib/context';
import { round } from 'lodash';
import {
  Button,
  CircularProgress,
  Dialog,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import Meal from '../Meal';
import { PlusIcon } from '@heroicons/react/outline';
import { Skeleton } from '@material-ui/lab';
import AddMeal from '@components/forms/meal/AddMeal';
import Widget from '@components/layout/Widget';
import Modal from '@components/overlays/Modal';

const Meals = () => {
  const { meals } = useContext(MealsContext);
  const [addMealOpen, setAddMealOpen] = useState(false);

  const renderMealTables = () =>
    meals?.map((meal, idx) => {
      //! Move this inside Meal
      const formattedFoods = meal.foods.map((food) => {
        const { amount, unit } = food;
        const formattedFood = {
          ...food,
          amount: `${amount}${unit}`,
        };

        Object.entries(
          pick(formattedFood, ['carb', 'prot', 'fat', 'kcal'])
        ).forEach(([key, value]) => {
          // @ts-ignore
          formattedFood[key] = round(value * amount, 2) || 0;
        });

        return formattedFood;
      });

      return <Meal key={idx} meal={meal} formattedFoods={formattedFoods} />;
    });

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
