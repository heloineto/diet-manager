import { useState } from 'react';
import { IconButton, Modal, useMediaQuery, useTheme } from '@material-ui/core';
import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'clsx';
import { AsideContext } from './ModalWithAside.context';
import { useDrag } from '@lib/hooks';

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
  onClose,
  actions,
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}: Props) => {
  const [aside, setAside] = useState<ReactNode>(null);
  const [asideLabel, setAsideLabel] = useState<string>('');

  const { style, setStyle, asideStyle, setDragElem, setAsideElem, setHandleElem } =
    useDrag(initialStyle);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const handleClose = () => {
    onClose?.();
    setStyle(initialStyle);
  };

  return (
    <Modal open={open} onClose={handleClose} BackdropProps={{ invisible: true }}>
      <div
        className={classNames(
          compact ? 'w-full h-full overflow-y-auto' : 'shadow-overlay rounded-xl',
          'absolute bg-white'
        )}
        style={compact ? undefined : style}
        ref={(elem) => setDragElem(elem)}
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
                ref={(elem) => setHandleElem(elem)}
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
            ref={(elem) => setAsideElem(elem)}
            style={compact ? {} : asideStyle}
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
