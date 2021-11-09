import { RotateLeftIcon, RotateRightIcon } from '@components/decoration/icons/outlined';
import { ZoomInIcon, ZoomOutIcon } from '@heroicons/react/outline';
import { IconButton, Slider } from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
  maxScale: number;
  rotate: number;
  setRotate: Dispatch<SetStateAction<number>>;
}

const PictureEditorAdjustments = ({
  scale,
  setScale,
  maxScale,
  rotate,
  setRotate,
}: Props) => {
  return (
    <div className="h-10 w-full mt-2.5 mb-2.5 flex justify-between">
      <div className="flex">
        <IconButton
          className="text-gray-800 hover:text-blue-600"
          onClick={() =>
            setRotate((value) => {
              const newValue = value + 90;
              return newValue >= 360 ? 0 : newValue;
            })
          }
        >
          <RotateRightIcon className="h-5 w-5" />
        </IconButton>
        <IconButton
          className="text-gray-800 hover:text-blue-600"
          onClick={() =>
            setRotate((value) => {
              const newValue = value - 90;
              return newValue <= -360 ? 0 : newValue;
            })
          }
        >
          <RotateLeftIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="flex items-center gap-x-2">
        <IconButton
          className="text-gray-800 hover:text-blue-600"
          onClick={() => setScale((value) => Math.max(value - 0.5, 1))}
        >
          <ZoomOutIcon className="h-5 w-5" />
        </IconButton>
        <Slider
          className="w-40"
          aria-label="Volume"
          value={scale}
          min={1}
          max={maxScale}
          color="secondary"
          onChange={(event, newValue) =>
            typeof newValue === 'number' && setScale(newValue)
          }
          step={0.1}
        />
        <IconButton
          className="text-gray-800 hover:text-blue-600"
          onClick={() => setScale((value) => Math.min(value + 0.5, maxScale))}
        >
          <ZoomInIcon className="h-5 w-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default PictureEditorAdjustments;
