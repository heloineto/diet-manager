import { useCallback } from 'react';

import { UserContext } from '@lib/context';
import { debounce, kebabCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '@lib/firebase';
import { TextField } from 'mui-rff';
import { CircularProgress } from '@material-ui/core';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

interface Props {
  label: string;
  name: string;
}

const UsernameField = ({ label, name }: Props) => {
  const [value, setValue] = useState('');
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useContext(UserContext);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setLoading(true);
  };

  const checkUsernameAvailable = useCallback(
    debounce(async (username: string) => {
      if (!username.length) {
        setLoading(false);
        return;
      }

      if (username === userDetails?.username) {
        setAvailable(true);
        setLoading(false);
        return;
      }

      const doc = firestore.doc(`usernames/${username}`);
      const { exists } = await doc.get();

      console.log('FIRESTORE READ EXECUTED');
      setAvailable(!exists);
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    checkUsernameAvailable(value);
  }, [value]);

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
            parse: (newUsername) => {
              handleChange(newUsername);

              return kebabCase(newUsername);
            },
          }}
          autoComplete={'off'}
        />
      </div>
      <div className="mt-1">
        {loading && (
          <CircularProgress size={25} thickness={8} color="secondary" />
        )}
        {!loading &&
          (available ? (
            <div className="flex gap-x-1 items-center text-primary-800 font-medium">
              <CheckIcon className="h-6 w-6 text-primary-500" />
              Identificador disponível!
            </div>
          ) : (
            <div className="flex gap-x-1 text-red-600 font-medium">
              <XIcon className="h-6 w-6 text-red-500" />
              <div>Identificador já é utilizado!</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsernameField;
