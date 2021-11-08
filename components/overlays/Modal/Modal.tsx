import ReactModal from 'react-modal';
import {
  IconButton,
  Modal as MuiModal,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { XIcon } from '@heroicons/react/outline';
import classNames from 'clsx';
import { useDrag } from '@lib/hooks';

interface Props {
  children: ReactNode;
  label?: string;
  open: boolean;
  onClose?: () => void;
  initialStyle?: CSSProperties;
}

const Modal = ({
  children,
  label,
  open,
  onClose = () => {},
  initialStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}: Props) => {
  ReactModal.setAppElement('#__next');

  const { style, setStyle, setDragElem, setHandleElem } = useDrag(initialStyle);

  const { breakpoints } = useTheme();
  const compact = useMediaQuery(breakpoints.down('md'));

  const handleClose = () => {
    onClose();
    setStyle(initialStyle);
  };

  return (
    <MuiModal open={open} onClose={handleClose} BackdropProps={{ invisible: true }}>
      <div
        className={classNames(
          compact ? 'w-full h-full overflow-y-auto p-0' : 'shadow-overlay rounded-xl',
          'absolute bg-white'
        )}
        style={compact ? undefined : style}
        ref={(elem) => setDragElem(elem)}
      >
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
        <div className="content p-5">{children}</div>
      </div>
    </MuiModal>
  );
};

export default Modal;
