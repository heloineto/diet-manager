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
import { AddMeal } from '@components/forms/meal/AddMeal';

const Meals = () => {
  const { meals } = useContext(MealsContext);
  const [addMealOpen, setAddMealOpen] = useState(false);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  const renderMealTables = () =>
    meals?.map((meal, idx) => {
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

      return <Meal key={idx} formattedMeal={{ ...meal, formattedFoods }} />;
    });

  return (
    <div className="flex-grow flex flex-col">
      {meals ? (
        <div className="mb-5 flex flex-col def-space-y">
          {renderMealTables()}
        </div>
      ) : (
        <div className="space-y-5 mb-5">
          <Skeleton
            className="w-full h-44 rounded-lg"
            animation="wave"
            variant="rect"
          />
          <Skeleton
            className="w-full h-44 rounded-lg"
            animation="wave"
            variant="rect"
          />
          <Skeleton
            className="w-full h-44 rounded-lg"
            animation="wave"
            variant="rect"
          />
        </div>
      )}

      <Button
        className="mt-auto"
        color="primary"
        variant="outlined"
        startIcon={<PlusIcon className="h-7 w-7" />}
        onClick={() => setAddMealOpen(true)}
      >
        Adicionar Refeição
      </Button>
      <Dialog
        fullScreen={compact}
        open={addMealOpen}
        onClose={() => setAddMealOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <AddMeal onCancel={() => setAddMealOpen(false)} />
      </Dialog>
    </div>
  );
};

export default Meals;
