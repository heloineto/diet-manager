import { useRef, useState } from 'react';
import { CameraIcon, PhotographIcon } from '@heroicons/react/outline';
import { Button, Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import type AvatarEditor from 'react-avatar-editor';
import PictureEditor from '../PictureEditor';
import profilePictureEditorFirebase from './ProfilePictureEditor.firebase';

interface Props {
  open: boolean;
  onClose: () => void;
  userRef?: FirebaseRef;
}

const ProfilePictureEditor = ({ open, onClose, userRef }: Props) => {
  const { breakpoints } = useTheme();
  const mobile = useMediaQuery(breakpoints.down('md'));

  const [image, setImage] = useState<File | null>(null);
  const editorRef = useRef<AvatarEditor>(null);

  const onSave = async () => {
    onClose();

    if (!editorRef?.current) return;

    const canvasScaled = editorRef.current.getImageScaledToCanvas();

    const url = canvasScaled.toDataURL('image/jpeg', 0.75);
    const base64Picture = url.split(',')[1];

    if (!userRef) return;
    await profilePictureEditorFirebase(userRef, base64Picture);

    setImage(null);
  };

  return (
    <Dialog
      fullScreen={mobile}
      maxWidth={'sm'}
      fullWidth={true}
      open={open}
      onClose={onClose}
      PaperProps={{ className: 'overflow-hidden' }}
    >
      <div className="flex flex-col p-5">
        <PictureEditor image={image} editorRef={editorRef} />

        <div className="flex justify-end gap-x-2.5">
          <Button
            className="rounded-md text-base text-gray-800"
            color="default"
            variant="outlined"
            endIcon={<PhotographIcon className="h-6 w-auto" />}
            component="label"
          >
            <input
              className="hidden"
              type="file"
              onChange={(e) => {
                if (e?.target?.files?.[0]) setImage(e.target.files[0]);
              }}
            />
            Selecionar arquivo
          </Button>
          <Button
            className="rounded-md text-base"
            variant="contained"
            endIcon={<CameraIcon className="h-6 w-auto" />}
          >
            Capturar da câmera
          </Button>
          <Button className="rounded-md text-base" variant="contained" onClick={onSave}>
            Salvar
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfilePictureEditor;
