import React from 'react';

interface Props {}

const Links = (props: Props) => {
  return (
    <>
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Logo */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/logo/other/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/logo/other/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/logo/other/apple-touch-icon.png"
      />
      {/* <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" /> */}
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      /> */}

      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link rel="mask-icon" href="/logo/other/safari-pinned-tab.svg" color="#28a30d" />
      {/* <link rel="shortcut icon" href="/favicon.ico" /> */}

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
