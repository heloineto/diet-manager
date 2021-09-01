import type { ReactNode, CSSProperties } from 'react';

import ReactModal from 'react-modal';
import { useModalWithAsideHook } from './ModalWithAside.hook';
import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  label?: string;
  open: boolean;
  onClose?: () => void;
  initialStyle?: CSSProperties;
  aside?: ReactNode;
}

const ModalWithAside = ({
  children,
  label,
  open,
  onClose = () => {},
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  aside,
}: Props) => {
  ReactModal.setAppElement('#__next');

  const {
    dragStart,
    drag,
    dragEnd,
    style,
    setStyle,
    asideModalStyle,
    setAsideModalStyle,
  } = useModalWithAsideHook(initialStyle);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  const close = () => {
    onClose();
    setStyle(initialStyle);
  };

  return (
    <ReactModal
      className={clsx(
        compact ? 'w-full h-full overflow-y-auto' : 'shadow-overlay rounded-xl',
        'absolute bg-white'
      )}
      isOpen={open}
      onRequestClose={close}
      style={{
        content: compact ? undefined : style,
        overlay: {
          zIndex: 1000,
          backgroundColor: 'transparent',
        },
      }}
    >
      <div className="p-0">
        <div
          className={clsx(
            compact ? 'p-5' : 'rounded-t-xl shadow-top-reflection pr-5',
            'h-14 w-full flex items-center justify-between font-bold bg-gray-200 text-gray-700'
          )}
        >
          {compact ? (
            <div>{label}</div>
          ) : (
            <div
              className="cursor-move flex-grow h-full flex items-center p-5"
              // @ts-ignore
              onMouseDown={dragStart}
              // @ts-ignore
              onMouseMove={drag}
              onMouseUp={dragEnd}
              onMouseLeave={dragEnd}
            >
              {label}
            </div>
          )}
          <IconButton edge="end" onClick={close}>
            <XIcon className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="content p-5">{children}</div>
      </div>
      {aside && (
        <div
          className="w-80 p-0 absolute top-0 inline-block mx-5"
          style={asideModalStyle}
        >
          {aside && aside}
        </div>
      )}
    </ReactModal>
  );
};

export default ModalWithAside;
