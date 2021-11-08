import { useCallback } from 'react';
import { UserContext } from '@lib/context';
import { debounce, kebabCase } from 'lodash';
import { useContext, useState } from 'react';
import { TextField } from 'mui-rff';
import { CircularProgress } from '@material-ui/core';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { docExists } from '@lib/utils/firestore';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

interface Props {
  label: string;
  name: string;
}

const UsernameField = ({ label, name }: Props) => {
  const [valid, setValid] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const { userDetails } = useContext(UserContext);

  //! ESlint doesn't know what dependencies are received from debounce.
  //! Neither do I ¯\_(ツ)_/¯
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsernameAvailable = useCallback(
    debounce(async (username: string) => {
      setLoading(true);
      setValid(true);

      const exists = await docExists(`usernames/${username}`);

      setLoading(false);
      setAvailable(!exists);
    }, 500),
    []
  );

  const validate = (username: string | undefined) => {
    if (!username) {
      setValid(false);
      return 'Forneça um identificador';
    }

    if (username.length < 3 || username.length > 30) {
      setValid(false);
      return 'O identificador deve ter de 3 a 30 caracteres';
    }

    if (!/^(?=[a-zA-Z0-9\-]{3,30}$)/.test(username)) {
      setValid(false);
      return 'Apenas letras sem acento, números e hifens (-) são permitidos';
    }

    if (!/(?!.*[\-]{2})[^\-].*[^\-]$/.test(username)) {
      setValid(false);
      return 'Não é permitido hifens consecutivos ou no final do identificador';
    }

    if (username === userDetails?.username) {
      setValid(false);
      setAvailable(true);
      setChanged(false);
      return;
    }

    setChanged(true);
    checkUsernameAvailable(username);
  };

  const renderHelperText = () => {
    if (!valid || !changed) return null;

    if (loading) return <CircularProgress size={25} thickness={8} color="secondary" />;

    return available ? (
      <div className="rounded-md bg-green-50 p-2 flex">
        <CheckCircleIcon
          className="flex-shrink-0 h-5 w-5 text-green-400"
          aria-hidden="true"
        />
        <p className="ml-3 text-sm font-medium text-green-800">
          Identificador disponível!
        </p>
      </div>
    ) : (
      <div className="rounded-md bg-red-50 p-2 flex">
        <XCircleIcon className="flex-shrink-0 h-5 w-5 text-red-400" aria-hidden="true" />
        <p className="ml-3 text-sm font-medium text-red-800">
          Identificador indisponível!
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex">
        <div className="h-10 bg-gray-100 rounded-l-lg border border-gray-300 shadow flex items-center">
          <div className="text-gray-500 font-semibold mx-[14px]">{`@`}</div>
        </div>
        <TextField
          className="w-full"
          label={label}
          name={name}
          type="text"
          InputProps={{
            className: 'rounded-l-none',
          }}
          fieldProps={{
            validate: validate,
          }}
          autoComplete="off"
        />
      </div>
      <div className="mt-1">{renderHelperText()}</div>
    </div>
  );
};

export default UsernameField;
