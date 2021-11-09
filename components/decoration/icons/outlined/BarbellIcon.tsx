interface Props {
  className?: string;
}

const BarbellIcon = ({ className }: Props) => {
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
        d="M24.5 10H28C28.2652 10 28.5196 10.1054 28.7071 10.2929C28.8946 10.4804 29 10.7348 29 11V21C29 21.2652 28.8946 21.5196 28.7071 21.7071C28.5196 21.8946 28.2652 22 28 22H24.5M7.5 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H7.5M12.5 16H19.5M29 16H30.5M1.5 16H3M8.5 7H11.5C12.0523 7 12.5 7.44772 12.5 8V24C12.5 24.5523 12.0523 25 11.5 25H8.5C7.94772 25 7.5 24.5523 7.5 24V8C7.5 7.44772 7.94772 7 8.5 7ZM20.5 7H23.5C24.0523 7 24.5 7.44772 24.5 8V24C24.5 24.5523 24.0523 25 23.5 25H20.5C19.9477 25 19.5 24.5523 19.5 24V8C19.5 7.44772 19.9477 7 20.5 7Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BarbellIcon;
