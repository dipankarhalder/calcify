import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5, user-scalable=no" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/icons/favicon.ico" />

      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Calcify: Home",
  keywords:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  description:
    "Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage",
};

export default Meta;