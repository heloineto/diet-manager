import clsx from 'clsx';
import DietManagerWordmark from '../DietManagerWordmark';

const AuthIllustration = () => {
  return (
    <div
      className={clsx(`
        relative left-0 top-0 w-full lg:w-1/2 flex justify-center min-h-[32vw]

        before:h-[125vw] before:w-[125vw] before:z-[-1] before:bg-primary-200 before:absolute
        before:rounded-full before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-3/4
        
        lg:before:fixed lg:before:top-1/2 lg:before:left-0 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2
        `)}
    >
      <DietManagerWordmark className="h-14 w-56 absolute lg:top-0 lg:left-0 mt-8 fill-[#047857]" />
    </div>
  );
};

export default AuthIllustration;
