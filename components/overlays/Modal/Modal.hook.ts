import type { CSSProperties, MouseEvent } from 'react';

import { useState } from 'react';

export const useModalHook = (initialStyle: CSSProperties) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [style, setStyle] = useState(initialStyle);

  const getParentAt = (currentTarget: EventTarget & HTMLElement, qnt: number) => {
    for (let i = 0; i < qnt; i++) {
      const aux = currentTarget.parentElement;
      if (aux) currentTarget = aux;
    }

    return currentTarget;
  };

  const dragStart = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOffset({
      //* Go tree nodes up, so the right element is selected
      x: e.screenX - getParentAt(e.currentTarget, 3).getBoundingClientRect().left,
      y: e.screenY - getParentAt(e.currentTarget, 3).getBoundingClientRect().top,
    });

    setDragging(true);
  };

  const drag = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!dragging) return;

    const left = e.screenX - offset.x;
    const top = e.screenY - offset.y;

    setStyle({
      left,
      top,
    });
  };

  const dragEnd = () => {
    setDragging(false);
  };

  return {
    dragStart,
    drag,
    dragEnd,
    style,
    setStyle,
  };
};
