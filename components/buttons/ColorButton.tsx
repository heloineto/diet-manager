import type { ReactNode } from 'react';

import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';

interface Props {
  children?: ReactNode;
  className?: string;
  startIcon?: JSX.Element;
  color: HexColor;
  contrastColor: HexColor;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: (props: { color: HexColor; contrastColor: HexColor }) =>
      props.color,
    color: (props) => props.contrastColor,
    boxShadow: (props) =>
      `0px 3px 1px -2px rgb(${props.color} / 30%), 0px 2px 2px 0px rgb(${props.color} / 24%), 0px 1px 5px 0px rgb(${props.color} / 22%)`,
    '&:hover': {
      boxShadow: (props) =>
        `0px 2px 4px -1px rgb(${props.color} / 40%), 0px 4px 5px 0px rgb(${props.color} / 34%), 0px 1px 10px 0px rgb(${props.color} / 32%)`,
    },
  },
});

const ColorButton = ({
  children,
  className,
  color,
  contrastColor,
  ...rest
}: Props) => {
  const classes = useStyles({
    color,
    contrastColor: contrastColor ?? '#ffffff',
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
