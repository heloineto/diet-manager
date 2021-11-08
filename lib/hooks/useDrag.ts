import { useEffect, useState } from 'react';

const useDrag = (initialStyle: CSSProperties) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [style, setStyle] = useState<CSSProperties>(initialStyle);
  const [asideStyle, setAsideStyle] = useState<CSSProperties>({
    left: '100%',
  });
  const [dragElem, setDragElem] = useState<HTMLDivElement | null>(null);
  const [asideElem, setAsideElem] = useState<HTMLDivElement | null>(null);
  const [handleElem, setHandleElem] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dragElem || !handleElem) return;

    const dragStart = (e: MouseEvent) => {
      document.body.classList.add('select-none');

      setOffset({
        x: e.clientX - dragElem.getBoundingClientRect().left,
        y: e.clientY - dragElem.getBoundingClientRect().top,
      });

      setDragging(true);
    };

    const drag = (e: MouseEvent) => {
      if (!dragging) return;

      setStyle({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
      });

      if (!asideElem) return;
      const dragRect = dragElem.getBoundingClientRect();
      const asideRect = asideElem.getBoundingClientRect();

      setAsideStyle(
        dragRect.x + dragRect.width + asideRect.width - window.innerWidth < 0
          ? { left: '100%' }
          : { right: '100%' }
      );
    };

    const dragEnd = () => {
      document.body.classList.remove('select-none');

      setDragging(false);
    };

    handleElem.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);

    return () => {
      handleElem.removeEventListener('mousedown', dragStart);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };
  }, [dragging, dragElem, asideElem, handleElem, offset.x, offset.y]);

  return { style, setStyle, asideStyle, setDragElem, setAsideElem, setHandleElem };
};

export default useDrag;
