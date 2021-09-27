import { ArrowLeftIcon } from '@heroicons/react/outline';
import { IconButton, Step, StepLabel, Stepper } from '@material-ui/core';
import { isKeyInShallowObject } from '@utils/typescript';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useProfileCompletion,
  useProfileCompletionSteps,
} from './ProfileCompletion.hook';

interface Props {
  stepName: string;
}

const ProfileCompletion = ({ stepName }: Props) => {
  const router = useRouter();

  const stepsIndex = {
    account: 0,
    generalGoals: 1,
    nutritionGoals: 2,
    metrics: 3,
  };

  const [activeStep, setActiveStep] = useState(
    isKeyInShallowObject(stepName, stepsIndex) ? stepsIndex[stepName] : 0
  );

  const completed = useProfileCompletion();

  const steps = useProfileCompletionSteps();

  useEffect(() => {
    router.push(`${steps[activeStep].name}`, undefined, { shallow: true });
  }, [activeStep]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderForm = () => {
    const { Form, label } = steps[activeStep];

    return (
      <>
        <div className="flex items-start h-12">
          {activeStep !== 0 && (
            <IconButton className="-mt-2.5" edge="start" onClick={prevStep}>
              <ArrowLeftIcon className="h-5 w-5" />
            </IconButton>
          )}
          <div className="font-bold text-xl text-gray-900 mx-auto">{label}</div>
        </div>
        <Form
          onClose={activeStep === steps.length - 1 ? () => router.push('/') : nextStep}
          submitButtonProps={{}}
        />
      </>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col justify-start items-center">
      <Stepper
        className="w-full sm:w-auto sm:mt-14 bg-transparent cursor-pointer"
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map(({ label, name, index }) => {
          return (
            <Step
              key={label}
              // @ts-ignore
              completed={completed[name]}
              onClick={() => setActiveStep(index)}
            >
              <StepLabel>
                <div className="hidden sm:block">{label}</div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="p-2.5 sm:p-5 sm:bg-white sm:rounded-xl sm:border-2 sm:border-solid sm:border-gray-100 sm:shadow-sm sm:hover:shadow-xl w-full sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 max-w-[44rem]">
        {renderForm()}
      </div>
    </div>
  );
};

export default ProfileCompletion;
