import type { Row } from 'react-table';

import { useState } from 'react';

export const useMealState = () => {
  const [expanded, setExpanded] = useState(true);
  const [hover, setHover] = useState(false);
  const [selectedRows, setSelectedRows] = useState<{
    [k: string]: Row<FormattedFood>;
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
