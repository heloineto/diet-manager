import { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import { useModalWithAsideHook } from './ModalWithAside.hook';
import { IconButton, useMediaQuery, useTheme, Modal } from '@material-ui/core';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'clsx';
import { AsideContext } from './ModalWithAside.context';
import useDrag from '@lib/hooks/useDrag';

interface Props {
  children: ReactNode;
  actions: ReactNode;
  label?: string;
  open: boolean;
  onClose?: () => void;
  initialStyle?: CSSProperties;
}

const ModalWithAside = ({
  children,
  label,
  open,
  onClose = () => {},
  actions,
}: Props) => {
  ReactModal.setAppElement('#__next');

  const [aside, setAside] = useState<ReactNode>(null);
  const [asideLabel, setAsideLabel] = useState<string>('');

  // const { style, setStyle, asideModalStyle, offset, setOffset, dragging, setDragging } =
  //   useModalWithAsideHook(initialStyle);

  const { draggableRef, draggableStyles } = useDrag();

  console.log(draggableStyles);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const handleClose = () => {
    onClose();
    // setStyle(initialStyle);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{ invisible: true }}
      style={
        compact
          ? undefined
          : draggableStyles ?? {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }
      }
      ref={draggableRef}
    >
      <div
        className={classNames(
          compact ? 'w-full h-full overflow-y-auto' : 'shadow-overlay rounded-xl',
          'absolute bg-white'
        )}
      >
        <div className={classNames(compact && aside && 'hidden')}>
          <div
            className={classNames(
              compact ? 'p-5' : 'rounded-t-xl shadow-top-reflection pr-5',
              'h-14 w-full flex items-center justify-between font-bold bg-gray-200 text-gray-700'
            )}
          >
            {compact ? (
              <div>{label}</div>
            ) : (
              <div
                className="cursor-move flex-grow h-full flex items-center p-5 select-none"
                // // @ts-ignore
                // onMouseDown={dragStart}
                // // @ts-ignore
                // onMouseMove={drag}
                // onMouseUp={dragEnd}
                // onMouseLeave={dragEnd}
              >
                {label}
              </div>
            )}
            <IconButton edge="end" onClick={handleClose}>
              <XIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <div className=" p-5">
            <AsideContext.Provider value={{ aside, setAside, asideLabel, setAsideLabel }}>
              {children}
              {actions}
            </AsideContext.Provider>
          </div>
        </div>
        {aside && (
          <div
            className={classNames(
              compact ? 'w-full h-full overflow-y-auto' : 'shadow-overlay rounded-xl',
              'absolute bg-white lg:w-80 p-0 top-0 inline-block lg:mx-5'
            )}
            // style={compact ? {} : asideModalStyle}
          >
            <div
              className={classNames(
                compact ? 'p-5' : 'rounded-t-xl shadow-top-reflection pl-5',
                'h-14 w-full flex items-center font-bold bg-gray-200 text-gray-700'
              )}
            >
              {compact && (
                <IconButton className="mr-1" edge="start" onClick={() => setAside(null)}>
                  <ArrowLeftIcon className="h-5 w-5" />
                </IconButton>
              )}
              {asideLabel}
            </div>
            <div className="p-5">
              {aside}
              {compact && actions}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalWithAside;
