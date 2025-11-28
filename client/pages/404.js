import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import core from "@/Core.module.scss";

import not_found from "@/404.svg";

const Custom404 = () => {
  return (
    <section className={core.app_core_layout}>
      <Head>
        <title>Page not found</title>
        <meta name="keywords" content="Page not found" />
        <meta name="description" content="Page not found" />
      </Head>
      <div className={core.full_page_width_height}>
        <Image src={not_found} alt="Not Found Page" width={300} height={320} />
        <h6>Sorry. The page you are looking for is not found.</h6>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
        <h2>Calcify</h2>
      </div>
    </section>
  );
};

export default Custom404;
