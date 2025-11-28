import Head from "next/head";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { validateDoctor } from "@/authValidation";
import { _corePostFunc } from "@/coreServices";
import { addBlog, listBlog } from "@/apiEndpoint";
import { RESEARCH } from "@/commonVar";
import core from "@/Core.module.scss";
import doct from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const AddResearch = lazy(() => import("@/doctor/research/addResearch"));
const ListResearch = lazy(() => import("@/doctor/research/listResearch"));
const AddBlogItem = lazy(() => import("@/patient/blogs/addBlogItem"));

const Research = () => {
  const [currentIndex] = useState(1);
  const [listData, setListData] = useState(null);
  const fetchResearchRef = useRef(false);
  const [openResearchPopup, setOpenResearchPopup] = useState(false);
  const [openAddBlogPopup, setOpenAddBlogPopup] = useState(false);

  const toggleResearchPopup = () => setOpenResearchPopup(!openResearchPopup);
  const toggleOpenAddBlogPop = () => setOpenAddBlogPopup(!openAddBlogPopup);

  const addNewResearchItem = payload => {
    _corePostFunc(addBlog, payload).then(res => {
      if (res.code === 200) {
        listResearch();
        toggleResearchPopup();
      }
    });
  };

  const addNewBlogsItem = payload => {
    _corePostFunc(addBlog, payload).then(res => {
      if (res.code === 200) {
        toggleOpenAddBlogPop();
      }
    });
  };

  const listResearch = () => {
    const payload = {
      page: currentIndex,
      perPage: 400,
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
        <title>Research</title>
        <meta name="keywords" content="Research" />
        <meta name="description" content="Research" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doct.research_cover}>
          <div className={doct.app_container_blog}>
            {fetchResearchRef ? (
              <ListResearch
                listData={listData}
                toggleResearchPopup={toggleResearchPopup}
                toggleOpenAddBlogPop={toggleOpenAddBlogPop}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {openResearchPopup && (
          <AddResearch
            addNewResearchItem={addNewResearchItem}
            toggleResearchPopup={toggleResearchPopup}
          />
        )}
        {openAddBlogPopup && (
          <AddBlogItem
            addNewBlogsItem={addNewBlogsItem}
            toggleOpenAddBlogPop={toggleOpenAddBlogPop}
          />
        )}
      </section>
    </Suspense>
  );
};

export default Research;
