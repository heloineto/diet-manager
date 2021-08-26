import { Button } from '@material-ui/core';

interface Props {
  label: string;
  mealRef: MealWithRef;
  onClose: () => void;
}

const RemoveMeal = ({ label, mealRef, onClose }: Props) => {
  return (
    <div>
      <p className="font-bold text-center">
        Remover "<span className="text-red-900">{label}</span>"?
      </p>
      <div className="flex def-gap-x mt-5">
        <Button className="bg-gray-500 w-1/2" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          className="bg-red-500 w-1/2"
          onClick={async () => {
            await mealRef.delete();
            onClose();
          }}
        >
          Remover
        </Button>
      </div>
    </div>
  );
};

export default RemoveMeal;
