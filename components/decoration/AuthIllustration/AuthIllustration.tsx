import styles from './AuthIllustration.module.css';
import classNames from 'classnames';

import Image from 'next/image';

const AuthIllustration = () => {
  return (
    <div
      className={classNames(
        styles['auth-illustration']
        // 'relative left-0 top-0 col-span-full lg:col-span-5 xl:col-span-6 flex justify-center'
      )}
    >
      <img
        className={classNames(
          styles['auth-wordmark']
          //
        )}
        src="/wordmark.svg"
        alt="wordmark"
        // layout="fill"
      />
    </div>
  );
};

export default AuthIllustration;
