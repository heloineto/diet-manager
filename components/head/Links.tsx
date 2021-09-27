import React from 'react';

interface Props {}

const Links = (props: Props) => {
  return (
    <>
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Icons */}
      {/* <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" /> */}

      {/* Importing Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default Links;