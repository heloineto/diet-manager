import type { ReactNode, Dispatch, SetStateAction, CSSProperties } from 'react';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { useWindowDimensions } from '@lib/hooks';
import StrippedIconButton from '../buttons/StrippedIconButton';
import { useModalHook } from './Modal.hook';
import { useMediaQuery, useTheme } from '@material-ui/core';

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  sideModal?: {
    title: string;
    render: JSX.Element;
  };
  initialStyle?: CSSProperties;
}

const Modal = ({
  children,
  open,
  setOpen,
  onClose,
  sideModal,
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}: Props) => {
  const {
    dragStart,
    drag,
    dragEnd,
    style,
    setStyle,
    sideModalStyle,
    setSideModalStyle,
  } = useModalHook(initialStyle);

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
        {...rest}
      >
        <div className="top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700">
          <div className="flex-grow h-full"></div>
          <StrippedIconButton
            Icon={(props) => <FaTimes {...props} />}
            twSize={5}
            onClick={close}
          />
        </div>
        <div className="content p-5">{children}</div>
        {sideModal && (
          <div className="px-5 pb-5 flex flex-col gap-y-2.5">
            <sideModal.render />
          </div>
        )}
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
            onMouseDown={(e) => dragStart(e, setIsDragging)}
            onMouseMove={drag}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
          ></div>
          <StrippedIconButton
            Icon={(props) => <FaTimes {...props} />}
            twSize={5}
            onClick={close}
          />
        </div>
        <div className="content p-5">{children}</div>
      </div>
      {sideModal && (
        <div
          className="modal-widget-wrapper w-80 p-0 absolute top-0 inline-block mx-5"
          style={sidePopUpStyle}
        >
          <div className="pl-5 font-bold top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700 rounded-t-xl">
            {sideModal.title}
          </div>
          <div className="p-5">
            <sideModal.render />
          </div>
        </div>
      )}
    </ReactModal>
  );
};

export default Modal;
