import { useCallback } from 'react';

import { UserContext } from '@lib/context';
import { debounce, kebabCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '@lib/firebase';
import { TextField } from 'mui-rff';
import { CircularProgress } from '@material-ui/core';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { docExists } from '@lib/auth';

interface Props {
  label: string;
  name: string;
}

const UsernameField = ({ label, name }: Props) => {
  const [valid, setValid] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useContext(UserContext);

  const checkUsernameAvailable = useCallback(
    debounce(async (username: string) => {
      setLoading(true);
      setValid(true);

      console.log(
        username,
        userDetails?.username,
        username === userDetails?.username
      );

      if (username === userDetails?.username) {
        setAvailable(true);
        setValid(false);
        setLoading(false);
        return;
      }

      const exists = await docExists(`usernames/${username}`);
      // console.log('FIRESTORE READ EXECUTED');
      setLoading(false);
      setAvailable(!exists);
    }, 500),
    [userDetails]
  );

  const validate = (username: string | undefined) => {
    if (!username) {
      setValid(false);
      return 'Forneça um identificador ';
    }

    if (username.length < 3) {
      setValid(false);
      return 'O identificador deve ter mais que 3 characteres';
    }

    checkUsernameAvailable(username);
  };

  const renderHelperText = () => {
    if (!valid) return null;

    if (loading)
      return <CircularProgress size={25} thickness={8} color="secondary" />;

    return available ? (
      <div className="flex gap-x-1 items-center text-primary-800 foßnt-medium">
        <CheckIcon className="h-6 w-6 text-primary-500" />
        Identificador disponível!
      </div>
    ) : (
      <div className="flex gap-x-1 text-red-600 font-medium">
        <XIcon className="h-6 w-6 text-red-500" />
        <div>Identificador indisponível!</div>
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
            parse: kebabCase,
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
