const NoAutoCompleteBackground = () => {
  return (
    <style global jsx>{`
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      select:-webkit-autofill,
      select:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0px 1000px #e5e7eb inset !important;
      }
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
      }
    `}</style>
  );
};

export default NoAutoCompleteBackground;
