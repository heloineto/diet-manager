const Links = () => {
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
    </>
  );
};

export default Links;
