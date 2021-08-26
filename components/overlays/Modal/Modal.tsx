import type { ReactNode, Dispatch, SetStateAction, CSSProperties } from 'react';

import ReactModal from 'react-modal';
import { useModalHook } from './Modal.hook';
import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { XIcon } from '@heroicons/react/outline';

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  initialStyle?: CSSProperties;
}

const Modal = ({
  children,
  open,
  setOpen,
  onClose = () => {},
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}: Props) => {
  ReactModal.setAppElement('#__next');

  const { dragStart, drag, dragEnd, style, setStyle } =
    useModalHook(initialStyle);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('sm'));

  const close = () => {
    setOpen((value) => !value);
    setStyle(initialStyle);
    onClose();
  };

  if (compact)
    return (
      <ReactModal
        isOpen={open}
        onRequestClose={close}
        className="absolute bg-white w-full h-full overflow-y-auto"
      >
        <div className="top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700">
          <div className="flex-grow h-full" />
          <IconButton onClick={close}>
            <XIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="content p-5">{children}</div>
      </ReactModal>
    );

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={close}
      className="absolute"
      style={{
        content: style,
      }}
    >
      <div className="modal-widget-wrapper p-0">
        <div className="top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700 rounded-t-xl">
          <div
            className="drag-handler cursor-move flex-grow h-full"
            // @ts-ignore
            onMouseDown={dragStart}
            // @ts-ignore
            onMouseMove={drag}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
          />
          <IconButton onClick={close}>
            <XIcon className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="content p-5">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
