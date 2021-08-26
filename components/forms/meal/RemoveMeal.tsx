import { Button } from '@material-ui/core';

interface Props {
  label: string;
  mealRef: FirebaseRef;
  onClose: () => void;
}

const RemoveMeal = ({ label, mealRef, onClose }: Props) => {
  return (
    <div>
      <p className="font-semibold text-center">
        Você tem certeza que deseja remover "
        <span className="text-red-900">{label}</span>"?
      </p>
      <div className="flex space-x-2.5 mt-5">
        <Button className="bg-gray-500 w-1/2 text-white" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          className="bg-red-500 w-1/2 text-white"
          onClick={async () => {
            onClose();
            await mealRef.delete();
          }}
        >
          Remover
        </Button>
      </div>
    </div>
  );
};

export default RemoveMeal;
