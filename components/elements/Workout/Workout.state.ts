import type { Row } from 'react-table';

import { useState } from 'react';

export const useWorkoutState = () => {
  const [expanded, setExpanded] = useState(true);
  const [hover, setHover] = useState(false);
  const [selectedRows, setSelectedRows] = useState<{
    [k: string]: Row<Exercise>;
  }>({});

  return {
    expanded,
    setExpanded,
    hover,
    setHover,
    selectedRows,
    setSelectedRows,
  };
};
