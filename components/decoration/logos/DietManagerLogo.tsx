import logoScalable from '@public/logo/round/scalable.svg';
import Image from 'next/image';

interface Props {
  className?: string;
}

const DietManagerLogo = ({ className }: Props) => {
  return (
    //! This is the most bizarre error i have ever encountered.
    //! it seems to be a problem with tailwind applying styling to the gradients of svgs? and only on md breakpoints??
    //! Anyways, tailwind is dumb (i still love it though)
    <div className={className}>
      <Image src={logoScalable} alt="diet manager logo" />
    </div>
    // <svg
    //   className={classNames(className)}
    //   viewBox="0 0 192 192"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <circle cx="96" cy="96" r="96" fill="url('#green-gradient')" />

    //   <path
    //     d="M149.836 16.505V166.284H118.355V153.17L118.107 147.238C118.107 144.611 117.934 141.955 117.073 139.473C116.491 137.793 115.722 136.34 114.35 134.513C114.685 134.125 115.007 133.727 115.317 133.318C118.324 129.346 120.108 124.397 120.108 119.031C120.108 106.329 110.099 97.0113 96.4203 92.6741C82.7413 88.3369 67.3941 89.3377 67.3941 89.3377C67.3941 89.3377 72.623 106.248 72.7331 119.236C72.8432 132.224 83.4061 142.719 96.4203 142.719C101.3 142.719 105.834 141.244 109.603 138.715L109.603 138.679C105.881 129.016 104.893 126.936 95.4193 117.363C97.518 119.057 99.2457 120.356 100.728 121.47L100.73 121.472C106.029 125.457 108.192 127.083 112.963 135.947L112.977 135.973C118.994 147.174 114.864 154.142 113.038 157.222L112.977 157.325C112.908 157.441 112.841 157.551 112.777 157.655C111.637 159.492 109.894 160.873 108.025 161.96C101.124 165.97 92.7357 167.976 82.8591 167.976C72.154 167.976 62.4349 165.579 53.7017 160.784C45.1095 155.99 38.3484 149.151 33.4184 140.268C28.4884 131.384 26.0234 121.091 26.0234 109.387C26.0234 97.6833 28.4884 87.3897 33.4184 78.5062C38.3484 69.6227 45.1095 62.7839 53.7017 57.9896C62.4349 53.1953 72.154 50.7982 82.8591 50.7982C97.3673 50.7982 108.706 55.3809 116.876 64.5464V2.27637C128.859 4.93366 140 9.83044 149.836 16.505Z"
    //     fill="#304C29"
    //   />
    //   <defs>
    //     <linearGradient id="green-gradient" gradientTransform="rotate(90)">
    //       <stop stopColor="#4CC528" />
    //       <stop offset="100%" stopColor="#0E8E4E" />
    //     </linearGradient>
    //   </defs>
    // </svg>
  );
};

export default DietManagerLogo;
