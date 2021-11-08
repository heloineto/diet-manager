import { Checkboxes } from 'mui-rff';
import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { Button } from '@material-ui/core';
import classNames from 'clsx';

import { UserContext } from '@lib/context';
import updateGeneralGoalsFirestore from './UpdateGeneralGoals.firestore';
import { isKeyInShallowObject } from '@lib/utils/typescript';

interface Props {
  className?: string;
  onClose?: () => void;
  submitButtonProps?: {
    innerText?: string;
  };
}

const UpdateGeneralGoals = ({ className, onClose, submitButtonProps }: Props) => {
  const { userDetails } = useContext(UserContext);

  const generalGoals = userDetails?.goals?.general || {};

  const initialValues = {
    generalGoals: Object.keys(generalGoals).filter(
      (key) => isKeyInShallowObject(key, generalGoals) && generalGoals[key]
    ),
  };

  const updateGeneralGoals = async ({ generalGoals }: UpdateGeneralGoalsValuesType) => {
    onClose && onClose();

    await updateGeneralGoalsFirestore({
      loseWeight: generalGoals?.includes('loseWeight') || false,
      buildMuscle: generalGoals?.includes('buildMuscle') || false,
      beHealthier: generalGoals?.includes('beHealthier') || false,
    });
  };

  return (
    <Form onSubmit={updateGeneralGoals} initialValues={initialValues}>
      {({ handleSubmit, submitting, values }) => (
        <form
          className={classNames(
            className,
            'grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6'
          )}
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-6">
            <Checkboxes
              label="Metas Gerais"
              name="generalGoals"
              data={[
                { label: 'Perder Peso', value: 'loseWeight' },
                { label: 'Ganhar Músculo', value: 'buildMuscle' },
                { label: 'Ser Mais Saudável', value: 'beHealthier' },
              ]}
              formGroupProps={{ row: true }}
            />
          </div>

          <div className="sm:col-span-6">
            <Button
              className="shadow-blue-500 hover:shadow-xl-blue-500 w-full group"
              color="secondary"
              variant="contained"
              size="small"
              endIcon={<ArrowRightIcon className="group-hover:ml-1 h-4 w-4" />}
              type="submit"
              disabled={submitting}
            >
              {submitButtonProps?.innerText || 'Próximo'}
            </Button>
          </div>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
        </form>
      )}
    </Form>
  );
};

export default UpdateGeneralGoals;
