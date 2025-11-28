import Head from "next/head";
import { Suspense, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { lazy } from "@loadable/component";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { validateDoctor } from "@/authValidation";
import core from "@/Core.module.scss";
import pat from "@/Patient.module.scss";

const Header = lazy(() => import("@/header"));

const Faq = () => {
  useEffect(() => {
    validateDoctor();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>FAQ</title>
        <meta name="keywords" content="FAQ" />
        <meta name="description" content="FAQ" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={pat.faq_cover}>
          <div className={core.app_container}>
            <div className={pat.faq_wrapper}>
              <h3>FAQ (Frequently Asked Questions)</h3>
              <Accordion>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What is Lorem Ipsum?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Where does it come from?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What is Lorem Ipsum?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Where does it come from?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What is Lorem Ipsum?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Where does it come from?
                      <span>
                        <HiChevronDown />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using Content here, content here, making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for lorem ipsum will
                      uncover many web sites still in their infancy. Various
                      versions have evolved over the years, sometimes by
                      accident, sometimes on purpose (injected humour and the
                      like).
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Faq;
