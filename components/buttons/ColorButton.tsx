import type { ReactNode } from 'react';

import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';
import { getContrastColor } from '@utils/styles';
import classNames from 'classnames';

interface Props {
  children?: ReactNode;
  className?: string;
  startIcon?: JSX.Element;
  color: HexColor;
  contrastColor?: HexColor;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: (props: { color: HexColor; contrastColor: HexColor }) =>
      props.color,
    color: (props) => props.contrastColor,
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 30%), 0px 2px 2px 0px rgb(0 0 0 / 24%), 0px 1px 5px 0px rgb(0 0 0 / 22%)',
    '&:hover': {
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 40%), 0px 4px 5px 0px rgb(0 0 0 / 34%), 0px 1px 10px 0px rgb(0 0 0 / 32%)',
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
    contrastColor: contrastColor ?? getContrastColor(color) ?? '#ffffff',
  });

  return (
    <Button
      className={clsx(classes.root, className)}
      variant="contained"
      color="inherit"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ColorButton;
