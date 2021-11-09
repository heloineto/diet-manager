interface Props {
  className?: string;
}

const RotateRightIcon = ({ className }: Props) => {
  return (
    <div className="relative flex justify-center items-center">
      <svg
        className={className}
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 3.90476C22 2.85279 21.0503 2 19.8788 2H17.7576C16.5861 2 15.6364 2.85279 15.6364 3.90476V20.0952C15.6364 21.1472 16.5861 22 17.7576 22H19.8788C21.0503 22 22 21.1472 22 20.0952V3.90476Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.81818 15.3333C2.81403 15.3333 2 16.3282 2 17.5555L2 19.7777C2 21.005 2.81403 21.9999 3.81818 21.9999L12 21.9999C12 19.7777 12 21.005 12 19.7777L12 17.5555C12 16.3282 12 17.5555 12 15.3333L3.81818 15.3333Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.77778 6.7619C9.77778 6.7619 11.1322 5.31077 12 4.38095M12 4.38095C11.1322 3.45113 9.77778 2 9.77778 2M12 4.38095C5.18182 4.38095 2.45454 6.28571 2.45454 12"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default RotateRightIcon;
