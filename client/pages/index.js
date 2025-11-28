import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineLightBulb, HiPhone } from "react-icons/hi";
import { lazy } from "@loadable/component";
import core from "@/Core.module.scss";
import home from "@/Home.module.scss";
import main_slider from "@/slider.jpg";

const Header = lazy(() => import("@/header"));

const Home = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Calcify</title>
        <meta name="keywords" content="Calcify" />
        <meta name="description" content="Calcify" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={home.homePageSlider}>
          <Image src={main_slider} alt="Main Slider" />
        </div>
        <div className={home.apppromot}>
          <div className={core.app_container}>
            <div className={home.apppromobox}>
              <div className={home.promoleft}>
                <h3>Avail Special Offer On Our Premium Plans</h3>
                <p>This offer is valid for first few custormers Hurry Up!</p>
              </div>
              <div className={home.promoright}>
                <span>Try Calcify for free</span>
              </div>
            </div>
          </div>
        </div>
        <div className={home.apphomecard}>
          <div className={core.app_container}>
            <div className={home.apphomecard}>
              <div className={home.apphomecardinside}>
                <h5>Get Professional Advise </h5>
                <h6>Select a doctor and schedule an oppointment</h6>
                <Link href="/">Know more</Link>
              </div>
              <div className={home.apphomecardinside}>
                <h5>Get Best Diet &amp; Exercises plans </h5>
                <h6>Select a doctor and schedule an oppointment</h6>
                <Link href="/">Know more</Link>
              </div>
              <div className={home.apphomecardinside}>
                <h5>Know your progress </h5>
                <h6>
                  Select Diet and Excersice that fit your body to get started
                </h6>
                <Link href="/">Know more</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={home.apphomeservices}>
          <div className={core.app_container}>
            <div className={home.apphomeservicescontent}>
              <h4>OUR SERVICES</h4>
              <div className={home.appservicesdesc}>
                <div className={home.appserviceshomedesc}>
                  <span>
                    <HiOutlineLightBulb />
                  </span>
                  <h5>Get Professional Advise</h5>
                  <h6>Select a doctor and schedule an oppointment</h6>
                </div>
                <div className={home.appserviceshomedesc}>
                  <span>
                    <HiOutlineLightBulb />
                  </span>
                  <h5>Best Diet &amp; Exercises plans</h5>
                  <h6>Select a doctor and schedule an oppointment</h6>
                </div>
                <div className={home.appserviceshomedesc}>
                  <span>
                    <HiOutlineLightBulb />
                  </span>
                  <h5>Know your progress</h5>
                  <h6>
                    Select Diet and Excersice that fit your body to get started
                  </h6>
                </div>
                <div className={home.appserviceshomedesc}>
                  <span>
                    <HiOutlineLightBulb />
                  </span>
                  <h5>Unparalled Expertise</h5>
                  <h6>
                    Don t doubt that you are getting the expert care that you
                    deserve
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={home.footer}>
          <div className={core.app_container}>
            <div className={home.appfooter}>
              <div className={home.contactinfoleft}>
                <div className={home.appmainfooterinfo}>
                  <h2>Calcify</h2>
                  <p>
                    Select a doctor and schedule an
                    <br />
                    oppointment. Select a doctor and schedule
                    <br />
                    an oppointment
                  </p>
                </div>
                <div className={home.getquote}>
                  <h4>Get Quote</h4>
                  <h6>
                    <HiPhone /> 18002255884
                  </h6>
                  <span>Try Calcify for free</span>
                </div>
              </div>
              <div className={home.contactinforight}>
                <div className={home.appmainfooterinfo}>
                  <h2>Contact Us</h2>
                  <p>
                    Chruch Street, Park Avenue, California,
                    <br />
                    United Stares of America
                  </p>
                </div>
                <div className={home.getquote}>
                  <h5>
                    <span>Email</span> info@calcify.com
                  </h5>
                  <h5>
                    <span>Phone</span> +1542 669 345
                  </h5>
                </div>
                {/* <div className="followus"><b>Follow Us on</b></div> */}
                <div className={home.icon}>
                  {/* <div className="icon1"><TwitterOutlined style={{ color: "white", paddingTop: "5px" }} /></div>
                      <div className="icon2"><YoutubeOutlined style={{ backgroundColor: "Red", fontSize: "25px", borderRadius: "20px" }} /></div>
                      <div className="icon3"><LinkedinOutlined style={{ paddingTop: "5px" }} /></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Home;
