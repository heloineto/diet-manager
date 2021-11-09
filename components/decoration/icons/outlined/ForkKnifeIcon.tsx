interface Props {
  className?: string;
}

const ForkKnifeIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 2V7M6.5 12.5V26M6.5 12.5C7.69347 12.5 8.83807 12.0259 9.68198 11.182C10.5259 10.3381 11 9.19347 11 8V2M6.5 12.5C5.30653 12.5 4.16193 12.0259 3.31802 11.182C2.47411 10.3381 2 9.19347 2 8V2M21.5 18H14.5C14.5 18 16 4 21.5 2V26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ForkKnifeIcon;
