import Head from "next/head";
import { Suspense, useState, useEffect, useRef } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc } from "@/coreServices";
import { validateDoctor } from "@/authValidation";
import {
  createFoodItem,
  foodListItems,
  listRegion,
  listDietType,
  listCategory,
  dietAddTemplate,
  dietListTemplate,
  dietEditTemplate,
  dietDeleteTemplate,
} from "@/apiEndpoint";
import { DIET } from "@/commonVar";
import core from "@/Core.module.scss";
import doc from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const ListFoodItems = lazy(() => import("@/doctor/resources/listFoodItems"));
const AddFoodItem = lazy(() => import("@/doctor/resources/addFoodItem"));
const ThemePagination = lazy(() => import("@/themePagination"));
const ListDietTemplate = lazy(() =>
  import("@/doctor/resources/listDietTemplate")
);
const AddDietTemplate = lazy(() =>
  import("@/doctor/resources/addDietTemplate")
);
const DeleteDietPopup = lazy(() =>
  import("@/doctor/resources/deleteDietPopup")
);
const EditDietTemplate = lazy(() =>
  import("@/doctor/resources/editDietTemplate")
);

const Resources = () => {
  const itemCountPerpage = 12;
  const fetchFoodItemRef = useRef(false);
  const [currentIndex] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [dietTemp, setDietTemp] = useState(false);
  const [foodItemPop, setFoodItemPop] = useState(false);
  const [listTemplateData, setListTemplateData] = useState(null);
  const [delPopup, setDelPopup] = useState(false);
  const [delId, setDelId] = useState(null);
  const [editPop, setEditPop] = useState(false);
  const [storeEdit, setStoreEdit] = useState(null);
  const [listFoodData, setListFoodData] = useState(null);
  const [listRegionItems, setListRegionItems] = useState(null);
  const [listDietCategoryItems, setListDietCategoryItems] = useState(null);
  const [listDietTypeItems, setListDietTypeItems] = useState(null);

  const toggleDietTemp = () => setDietTemp(!dietTemp);
  const toggleFoodItemPopup = () => setFoodItemPop(!foodItemPop);
  const addItemInFood = payload => {
    _corePostFunc(createFoodItem, payload).then(res => {
      if (res.code === 200) {
        onGetFoodItem();
        setFoodItemPop(false);
      }
    });
  };
  const addnewDietTemplate = payload => {
    _corePostFunc(dietAddTemplate, payload).then(res => {
      if (res.code === 200) {
        getAllTemplateItem();
        toggleDietTemp();
      }
    });
  };

  const getAllTemplateItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage * 2,
    };
    _corePostFunc(dietListTemplate, payload).then(res => {
      if (res.code === 200) {
        setListTemplateData(res.data);
      }
    });
  };

  const closeDeletePopup = () => setDelPopup(false);
  const toggeleDeletePopup = itemId => {
    setDelId(itemId);
    setDelPopup(true);
  };
  const deleteDietTemplate = () => {
    _corePostFunc(dietDeleteTemplate, { id: delId }).then(res => {
      if (res.code === 200) {
        getAllTemplateItem();
        closeDeletePopup();
      }
    });
  };

  const closeEditDayWisePopup = () => setEditPop(false);
  const openEditDayWisePopup = editItem => {
    setStoreEdit(editItem);
    setEditPop(true);
  };
  const editDayWiseItem = payload => {
    _corePostFunc(dietEditTemplate, payload).then(res => {
      if (res.code === 200) {
        getAllTemplateItem();
        closeEditDayWisePopup();
      }
    });
  };

  const getFoodItemsList = payload => {
    _corePostFunc(foodListItems, payload).then(res => {
      if (res.code === 200) {
        setListFoodData(res.data);
        setTotalRecord(Math.ceil(res.pageInfo.totalPage));
      }
    });
  };
  const onGetFoodItem = () => {
    const payload = {
      page: currentIndex,
      perPage: itemCountPerpage,
    };
    getFoodItemsList(payload);
  };
  const handlePageClick = event => {
    const payload = {
      page: event.selected + 1,
      perPage: itemCountPerpage,
    };
    getFoodItemsList(payload);
  };

  const getRegions = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
    };
    _corePostFunc(listRegion, payload).then(res => {
      if (res.code === 200) {
        setListRegionItems(res.data);
      }
    });
  };

  const getDietTypeItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
    };
    _corePostFunc(listDietType, payload).then(res => {
      if (res.code === 200) {
        setListDietTypeItems(res.data);
      }
    });
  };

  const getDietCategoryItems = () => {
    const payload = {
      page: currentIndex,
      perPage: 1000,
      type: DIET,
    };
    _corePostFunc(listCategory, payload).then(res => {
      if (res.code === 200) {
        setListDietCategoryItems(res.data);
      }
    });
  };

  useEffect(() => {
    if (fetchFoodItemRef.current) return;
    fetchFoodItemRef.current = true;
    getAllTemplateItem();
    onGetFoodItem();
    getRegions();
    getDietTypeItems();
    getDietCategoryItems();
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dietProps = {
    storeEdit,
    listRegionItems,
    listDietTypeItems,
    listFoodData,
    listTemplateData,
    listDietCategoryItems,
    editDayWiseItem,
    closeEditDayWisePopup,
    toggleDietTemp,
    toggeleDeletePopup,
    openEditDayWisePopup,
    toggleFoodItemPopup,
    addnewDietTemplate,
    addItemInFood,
    deleteDietTemplate,
    closeDeletePopup,
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Diet</title>
        <meta name="keywords" content="Diet" />
        <meta name="description" content="Diet" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doc.resource_wrapp}>
          <div className={core.app_container}>
            {fetchFoodItemRef && (
              <>
                <ListDietTemplate listDietTemplateProps={dietProps} />
                <ListFoodItems listFoodProps={dietProps} />
                <ThemePagination
                  totalRecord={totalRecord}
                  handlePageClick={handlePageClick}
                />
              </>
            )}
          </div>
        </div>
        {foodItemPop && <AddFoodItem addFoodItemProps={dietProps} />}
        {dietTemp && <AddDietTemplate addDietTempProps={dietProps} />}
        {editPop && <EditDietTemplate editPopupProps={dietProps} />}
        {delPopup && <DeleteDietPopup deleteDietProps={dietProps} />}
      </section>
    </Suspense>
  );
};

export default Resources;
