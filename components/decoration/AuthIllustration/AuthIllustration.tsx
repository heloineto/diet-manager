import styles from './AuthIllustration.module.css';
import classNames from 'classnames';

const AuthIllustration = () => {
  return (
    <div
      className={classNames(
        styles['illustration'],
        'relative left-0 top-0 w-full lg:w-1/2 flex justify-center'
      )}
    >
      <img
        className={classNames(
          styles['wordmark'],
          'absolute lg:top-0 lg:left-0 mt-8 h-12'
        )}
        src="/wordmark.svg"
        alt="wordmark"
        // layout="fill"
      />
    </div>
  );
};

export default AuthIllustration;
