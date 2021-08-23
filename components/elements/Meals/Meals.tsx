import { useContext, useState } from 'react';
import { pick } from 'lodash';

import { MealsContext } from '@lib/context';
import { round } from 'lodash';
import { Button, CircularProgress } from '@material-ui/core';

import Meal from '../Meal';

const Meals = () => {
  const { meals } = useContext(MealsContext);
  const [isMealFormOpen, setIsMealFormOpen] = useState(false);

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
      {false ? (
        <div className="mb-5 flex flex-col def-gap-y">{renderMealTables()}</div>
      ) : (
        <CircularProgress color="inherit" className="m-auto" />
      )}

      <Button
        color="primary"
        variant="outlined"
        className="mt-auto"
        onClick={() => setIsMealFormOpen(true)}
      >
        Adicionar Refeição
      </Button>
      {/* <PopUp isOpen={isMealFormOpen} setIsOpen={setIsMealFormOpen}>
        <AddMeal onFinish={() => setIsMealFormOpen(false)} />
      </PopUp> */}
    </div>
  );
};

export default Meals;
