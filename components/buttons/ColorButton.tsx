import type { MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';
import { hexToRgb } from '@utils/styles';

interface Props {
  children?: ReactNode;
  className?: string;
  startIcon?: JSX.Element;
  color: HexColor;
  contrastColor: HexColor;
  shadowColor: HexColor;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: (props: {
      color: HexColor;
      contrastColor: HexColor;
      rgbColor: RgbColor;
    }) => props.color,
    color: ({ contrastColor }) => contrastColor,
    boxShadow: ({ rgbColor }) =>
      `0px 3px 1px -2px rgb(${rgbColor} / 30%), 0px 2px 2px 0px rgb(${rgbColor} / 24%), 0px 1px 5px 0px rgb(${rgbColor} / 22%)`,
    '&:hover': {
      backgroundColor: ({ color }) => color,
      filter: 'brightness(0.9)',
      boxShadow: ({ rgbColor }) =>
        `0px 2px 4px -1px rgb(${rgbColor} / 40%), 0px 4px 5px 0px rgb(${rgbColor} / 34%), 0px 1px 10px 0px rgb(${rgbColor} / 32%)`,
    },
  },
});

const ColorButton = ({
  children,
  className,
  color,
  contrastColor,
  shadowColor,
  ...rest
}: Props) => {
  const classes = useStyles({
    color,
    contrastColor: contrastColor ?? '#ffffff',
    rgbColor: hexToRgb(shadowColor),
  });

  return (
    <Button
      className={clsx(classes.root, className)}
      variant="contained"
      color="default"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ColorButton;
