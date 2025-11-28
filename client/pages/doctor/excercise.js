import Head from "next/head";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import {
  createExcerItem,
  listExcerItems,
  listCategory,
  addExcTemplate,
  listExcTemplate,
  editExcTemplate,
  deleteExcTemplate,
} from "@/apiEndpoint";
import { EXERCISE } from "@/commonVar";
import { validateDoctor } from "@/authValidation";
import core from "@/Core.module.scss";
import doc from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const ListExcr = lazy(() => import("@/doctor/excercise/listExcr"));
const AddExcercise = lazy(() => import("@/doctor/excercise/addExcercise"));
const ListExcrTemplate = lazy(() =>
  import("@/doctor/excercise/listExcrTemplate")
);
const AddExcerTemplate = lazy(() =>
  import("@/doctor/excercise/addExcerTemplate")
);
const EditExcerTemplate = lazy(() =>
  import("@/doctor/excercise/editExcerTemplate")
);
const DeleteExcerPopup = lazy(() =>
  import("@/doctor/excercise/deleteExcerPopup")
);

const Excercise = () => {
  const itemCountPerpage = 10;
  const fetchExcerItemRef = useRef(false);
  const [currentIndex] = useState(1);
  const [listExcerData, setListExcerData] = useState(null);
  const [listTemplateExcer, setListTemplateExcer] = useState(null);
  const [delPopup, setDelPopup] = useState(false);
  const [delId, setDelId] = useState(null);
  const [excrPop, setExcrPop] = useState(false);
  const [excrTemp, setExcrTemp] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [storeEdit, setStoreEdit] = useState(null);
  const [listDietCategoryItems, setListDietCategoryItems] = useState(null);

  const toggleExcrPopup = () => setExcrPop(!excrPop);
  const toggleExcrTemp = () => setExcrTemp(!excrTemp);

  const addItemInExcer = payload => {
    _corePostFunc(createExcerItem, payload).then(res => {
      if (res.code === 200) {
        onGetExcerItem();
        setExcrPop(false);
      }
    });
  };

  const onGetExcerItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listExcerItems, payload).then(res => {
      if (res.code === 200) {
        setListExcerData(res.data);
      }
    });
  };

  const getDietCategoryItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
      type: EXERCISE,
    };
    _corePostFunc(listCategory, payload).then(res => {
      if (res.code === 200) {
        setListDietCategoryItems(res.data);
      }
    });
  };

  const addNewExcerTempolate = payload => {
    _corePostFunc(addExcTemplate, payload).then(res => {
      if (res.code === 200) {
        onAllExcerTemplate();
        setExcrTemp(false);
      }
    });
  };

  const onAllExcerTemplate = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    _corePostFunc(listExcTemplate, payload).then(res => {
      if (res.code === 200) {
        setListTemplateExcer(res.data);
      }
    });
  };

  const closeEditDayWisePopup = () => setEditPop(false);
  const openEditDayWisePopup = editItem => {
    setStoreEdit(editItem);
    setEditPop(true);
  };
  const editDayWiseItem = payload => {
    _corePostFunc(editExcTemplate, payload).then(res => {
      if (res.code === 200) {
        onAllExcerTemplate();
        closeEditDayWisePopup();
      }
    });
  };

  const closeDeletePopup = () => setDelPopup(false);
  const toggeleDeletePopup = itemId => {
    setDelId(itemId);
    setDelPopup(true);
  };
  const deleteExcerTemplate = () => {
    _corePostFunc(deleteExcTemplate, { id: delId }).then(res => {
      if (res.code === 200) {
        onAllExcerTemplate();
        closeDeletePopup();
      }
    });
  };

  useEffect(() => {
    if (fetchExcerItemRef.current) return;
    fetchExcerItemRef.current = true;
    onGetExcerItem();
    validateDoctor();
    getDietCategoryItems();
    onAllExcerTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const excerProps = {
    toggleExcrPopup,
    addItemInExcer,
    toggleExcrTemp,
    addNewExcerTempolate,
    closeDeletePopup,
    toggeleDeletePopup,
    deleteExcerTemplate,
    openEditDayWisePopup,
    closeEditDayWisePopup,
    editDayWiseItem,
    storeEdit,
    listExcerData,
    listDietCategoryItems,
    listTemplateExcer,
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Excercise</title>
        <meta name="keywords" content="Excercise" />
        <meta name="description" content="Excercise" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doc.resource_wrapp}>
          <div className={core.app_container}>
            <ListExcrTemplate dataExcrTemp={excerProps} />
            <ListExcr dataExcrItemTemp={excerProps} />
          </div>
        </div>
        {excrPop && <AddExcercise addExcerProps={excerProps} />}
        {excrTemp && <AddExcerTemplate addTemplateProps={excerProps} />}
        {editPop && <EditExcerTemplate editTemp={excerProps} />}
        {delPopup && <DeleteExcerPopup deleteExcerProps={excerProps} />}
      </section>
    </Suspense>
  );
};

export default Excercise;
