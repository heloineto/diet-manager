import type { Row } from 'react-table';

import { SelectedDateContext } from '@lib/context';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useContext, useState } from 'react';

export const useMealState = () => {
  const [expanded, setExpanded] = useState(true);
  const [hover, setHover] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Row[]>([]); // !make this an object

  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [removeMealOpen, setRemoveMealOpen] = useState(false);
  const [updateMealOpen, setUpdateMealOpen] = useState(false);

  return {
    expanded,
    setExpanded,
    hover,
    setHover,
    selectedRows,
    setSelectedRows,
    addFoodOpen,
    setAddFoodOpen,
    removeMealOpen,
    setRemoveMealOpen,
    updateMealOpen,
    setUpdateMealOpen,
  };
};
