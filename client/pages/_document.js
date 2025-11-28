import { Head, Html, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "@/gtag";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=optional"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe
              src="https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            />`
          }} 
        />
      </body>
    </Html>
  );
};

export default Document;
