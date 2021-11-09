interface Props {
  className?: string;
}

const RotateLeftIcon = ({ className }: Props) => {
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
          d="M2 3.90476C2 2.85279 2.9497 2 4.12121 2H6.24242C7.41394 2 8.36364 2.85279 8.36364 3.90476V20.0952C8.36364 21.1472 7.41394 22 6.24242 22H4.12121C2.9497 22 2 21.1472 2 20.0952V3.90476Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.1818 15.3333C21.186 15.3333 22 16.3282 22 17.5555L22 19.7777C22 21.005 21.186 21.9999 20.1818 21.9999L12 21.9999C12 19.7777 12 21.005 12 19.7777L12 17.5555C12 16.3282 12 17.5555 12 15.3333L20.1818 15.3333Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2222 6.7619C14.2222 6.7619 12.8678 5.31077 12 4.38095M12 4.38095C12.8678 3.45113 14.2222 2 14.2222 2M12 4.38095C18.8182 4.38095 21.5455 6.28571 21.5455 12"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default RotateLeftIcon;
