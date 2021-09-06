import type { ReactNode } from 'react';

import UpdateAccount from '@components/forms/profile/UpdateAccount';
import UpdateGeneralGoals from '@components/forms/profile/UpdateGeneralGoals';
import UpdateMetrics from '@components/forms/profile/UpdateMetrics';
import UpdateNutritionGoals from '@components/forms/profile/UpdateNutritionGoals';
import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useProfileCompletion } from './ProfileCompletion.hook';

interface Props {}

const ProfileCompletion = (props: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const resetSteps = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Select campaign settings',
      description: 'Select campaign settings...',
      skipped: false,
    },
    {
      label: 'Select campaign settings',
      description: 'What is an ad group anyways?',
      skipped: false,
    },
    {
      label: 'Create an ad group',
      description: 'This is the bit I really care about!',
      skipped: false,
    },
    {
      label: 'Create an advertisement',
      description: 'Unknown step',
      skipped: false,
    },
  ];

  const completed = useProfileCompletion();

  const Forms = [
    UpdateAccount,
    UpdateGeneralGoals,
    UpdateNutritionGoals,
    UpdateMetrics,
  ];

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ label, skipped }) => {
          return (
            <Step key={label} completed={!skipped}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="p-2.5 sm:p-5 sm:bg-white sm:rounded-xl sm:border-2 sm:border-solid sm:border-gray-100 sm:shadow-sm sm:hover:shadow-xl w-full sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12 max-w-[44rem]">
        {Forms.map((Form, idx) => idx == 1 && <Form key={idx} />)}
      </div>
    </div>
  );
};

export default ProfileCompletion;
