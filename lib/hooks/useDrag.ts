import { useEffect, useRef, useState } from 'react';

const useDrag = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const draggableRef = useRef<HTMLDivElement>(null);
  const [draggableStyles, setDraggableStyles] = useState<CSSProperties | null>(null);

  useEffect(() => {
    console.log(draggableRef);

    const draggableElem = draggableRef?.current;

    if (!draggableElem) return;

    const dragStart = (e: MouseEvent) => {
      document.body.classList.add('select-none');

      setOffset({
        x: e.clientX - draggableElem.getBoundingClientRect().left,
        y: e.clientY - draggableElem.getBoundingClientRect().top,
      });

      setDragging(true);
    };

    const drag = (e: MouseEvent) => {
      if (!dragging) return;

      setDraggableStyles({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
      });

      console.log(e.pageX - offset.x);
    };

    const dragEnd = () => {
      document.body.classList.remove('select-none');

      setDragging(false);
    };

    draggableElem.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', dragEnd);

    return () => {
      draggableElem.removeEventListener('mousedown', dragStart);
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', dragEnd);
    };
  }, [dragging, draggableRef]);

  return { draggableRef, draggableStyles };
};

export default useDrag;
