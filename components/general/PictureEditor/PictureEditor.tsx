import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import PictureEditorAdjustments from './PictureEditor.Adjustments';

interface Props {
  image: File | null;
  editorRef: RefObject<AvatarEditor>;
}

const PictureEditor = ({ image, editorRef }: Props) => {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [rotate, setRotate] = useState(0);

  const maxScale = useMemo(() => 4, []);

  const border = 20;

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleZoom = (e: WheelEvent) => {
      e.preventDefault();

      setScale((currScale) => {
        return Math.min(Math.max(1, currScale + e.deltaY * -0.001), maxScale);
      });
    };

    if (!divRef?.current) return;

    const divElem = divRef.current;
    const { width, height } = divElem.getBoundingClientRect();

    setSize({
      width: Math.max(width - border * 2, 0),
      height: Math.max(height - border * 2, 0),
    });

    divElem.addEventListener('wheel', handleZoom);

    return () => divElem.removeEventListener('wheel', handleZoom);
  }, [maxScale]);

  return (
    <>
      <div className="rounded-md relative after:block after:pb-[100%]">
        <div className="absolute w-full h-full rounded-md overflow-hidden" ref={divRef}>
          {image && (
            <AvatarEditor
              className="editor-canvas w-full h-full"
              width={size.width}
              height={size.height}
              ref={editorRef}
              scale={scale}
              border={border}
              position={position}
              onPositionChange={(newPosition) => setPosition(newPosition)}
              image={image}
              onLoadSuccess={() => {
                setPosition({ x: 0, y: 0 });
                setScale(1);
              }}
              rotate={rotate}
            />
          )}
        </div>
      </div>
      {image && (
        <PictureEditorAdjustments
          scale={scale}
          setScale={setScale}
          maxScale={maxScale}
          rotate={rotate}
          setRotate={setRotate}
        />
      )}
    </>
  );
};

export default PictureEditor;
