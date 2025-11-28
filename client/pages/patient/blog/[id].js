import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { useRouter } from "next/router";
// import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { _corePostFunc } from "@/coreServices";
import { img_base_path } from "@/baseUrlConfig";
import { listBlog } from "@/apiEndpoint";
import { validateDoctor } from "@/authValidation";
import ImageDisplay from "@/imageDisplay";
import core from "@/Core.module.scss";
import doct from "@/Doctor.module.scss";
import { share_base_path } from "@/baseUrlConfig";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const Header = lazy(() => import("@/header"));

const BlogDetails = () => {
  const router = useRouter();

  const itemCountPerpage = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [listData, setListData] = useState(null);
  // const [likes, setLikes] = useState(false);
  const fetchResearchRef = useRef(false);

  const listResearch = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
      type: "BLOG",
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
        <title>Blog details</title>
        <meta name="keywords" content="Blog details" />
        <meta name="description" content="Blog details" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doct.research_cover}>
          <div className={doct.app_container_blog}>
            {fetchResearchRef ? (
              <div className={doct.research_wrapper}>
                {listData &&
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
                              Dr. {item.creator.firstName}{" "}
                              {item.creator.lastName}
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
                          <h4>{item.title}</h4>
                          <div
                            className={doct.content_item}
                            dangerouslySetInnerHTML={{
                              __html: `${item.content}`,
                            }}
                          />
                          <div className={doct.likeCommetSec}>
                            {/* <div
                              className={
                                likes ? doct.likedSecActv : doct.likedSec
                              }
                              onClick={() => setLikes(!likes)}
                            >
                              {likes ? (
                                <>
                                  <HiThumbUp />
                                  <p>Liked</p>
                                </>
                              ) : (
                                <>
                                  <HiOutlineThumbUp />
                                  <p>Like</p>
                                </>
                              )}
                            </div> */}
                            <div className={doct.likedSec}>
                              <div className={doct.share_div}>
                                <div className={doct.itemShare}>
                                  <FacebookShareButton
                                    quote={item.title}
                                    url={`${share_base_path}/patient/blog/${item.id}`}
                                  >
                                    <FacebookIcon size={32} round={true} />
                                  </FacebookShareButton>
                                </div>
                                <div className={doct.itemShare}>
                                  <WhatsappShareButton
                                    url={`${share_base_path}/patient/blog/${item.id}`}
                                    title={item.title}
                                    separator=":: "
                                  >
                                    <WhatsappIcon size={32} round={true} />
                                  </WhatsappShareButton>
                                </div>
                                <div className={doct.itemShare}>
                                  <EmailShareButton
                                    url={`${share_base_path}/patient/blog/${item.id}`}
                                    subject={item.title}
                                    body={item.content}
                                  >
                                    <EmailIcon size={32} round={true} />
                                  </EmailShareButton>
                                </div>
                              </div>
                            </div>
                            {/* <div className={doct.rightLink}>
                              <Link href={`/patient/blog/${item.id}`}>
                                <a className={doct.rightLink}>
                                  more details...
                                </a>
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      )
                  )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default BlogDetails;
