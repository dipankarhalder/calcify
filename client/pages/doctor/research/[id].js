import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { useRouter } from "next/router";
import { _corePostFunc } from "@/coreServices";
import { listBlog } from "@/apiEndpoint";
import { img_base_path } from "@/baseUrlConfig";
import { HiArrowSmLeft } from "react-icons/hi";
import { validateDoctor } from "@/authValidation";
import { RESEARCH } from "@/commonVar";
import core from "@/Core.module.scss";
import doct from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const ImageDisplay = lazy(() => import("@/imageDisplay"));

const ResearchDetails = () => {
  const router = useRouter();
  const itemCountPerpage = 5000;
  const currentIndex = 1;
  const fetchResearchRef = useRef(false);
  const [listData, setListData] = useState(null);

  const listResearch = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
      type: RESEARCH,
    };
    _corePostFunc(listBlog, payload).then(res => {
      if (res.code === 200) {
        setListData(res);
      }
    });
  };

  useEffect(() => {
    if (fetchResearchRef.current) return;
    fetchResearchRef.current = true;
    listResearch();
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Research Details</title>
        <meta name="keywords" content="Research Details" />
        <meta name="description" content="Research Details" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doct.research_cover}>
          <div className={doct.app_container_blog}>
            <div className={doct.research_wrapper}>
              {fetchResearchRef &&
                listData &&
                listData.data.map(
                  item =>
                    item.id === router.query.id && (
                      <div key={item.id} className={doct.list_blog}>
                        <div className={doct.avatarInfo}>
                          {item.creator.imageId !== null ? (
                            <span>
                              <ImageDisplay
                                path={`${img_base_path}${item.creator.imageId}`}
                                width={50}
                                height={50}
                                alt={item.creator.firstName}
                              />
                            </span>
                          ) : (
                            <span>No Image</span>
                          )}
                          <p className={doct.drname}>
                            Dr. {item.creator.firstName} {item.creator.lastName}
                          </p>
                          <p className={doct.datarel}>
                            {moment(item.publishedAt).format("LL")}
                          </p>
                        </div>
                        <span>
                          <ImageDisplay
                            path={`${img_base_path}${item.files[0]}`}
                            width={768}
                            height={280}
                            alt={item.creator.firstName}
                          />
                        </span>
                        <Link href={"/doctor/research"}>
                          <a className={doct.leftLinkBack}>
                            <HiArrowSmLeft />
                            Back
                          </a>
                        </Link>
                        <h4>{item.title}</h4>
                        <div
                          className={doct.content_item}
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        />
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ResearchDetails;
