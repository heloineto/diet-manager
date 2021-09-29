import { Button } from '@material-ui/core';

interface Props {
  label: string;
  workoutRef: FirebaseRef;
  onClose: () => void;
}

const RemoveWorkout = ({ label, workoutRef, onClose }: Props) => {
  return (
    <div>
      <p className="font-semibold text-center">
        Você tem certeza que deseja remover &quot;
        <span className="text-red-900">{label}</span>
        &quot;?
      </p>
      <div className="flex space-x-2.5 mt-5">
        <Button className="bg-gray-500 w-1/2 text-white" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          className="bg-red-500 w-1/2 text-white"
          onClick={async () => {
            onClose();
            await workoutRef.delete();
          }}
        >
          Remover
        </Button>
      </div>
    </div>
  );
};

export default RemoveWorkout;
