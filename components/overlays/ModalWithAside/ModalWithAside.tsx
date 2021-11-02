import { CSSProperties, ReactNode, useState } from 'react';

import ReactModal from 'react-modal';
import { useModalWithAsideHook } from './ModalWithAside.hook';
import { IconButton, useMediaQuery, useTheme } from '@material-ui/core';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'clsx';
import { AsideContext } from './ModalWithAside.context';

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
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  actions,
}: Props) => {
  ReactModal.setAppElement('#__next');

  const [aside, setAside] = useState<ReactNode>(null);
  const [asideLabel, setAsideLabel] = useState<string>('');

  const { dragStart, drag, dragEnd, style, setStyle, asideModalStyle } =
    useModalWithAsideHook(initialStyle);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const close = () => {
    onClose();
    setStyle(initialStyle);
  };

  return (
    <ReactModal
      className={classNames(
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
          style={compact ? {} : asideModalStyle}
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
    </ReactModal>
  );
};

export default ModalWithAside;
