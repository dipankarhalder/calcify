import { HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { lazy } from "@loadable/component";
import { _corePostFunc, _corePostUpload } from "@/coreServices";
import { listCategory, uploadFileItem } from "@/apiEndpoint";
import doc from "@/Doctor.module.scss";

const FileUpload = lazy(() => import("../../fileUpload"));

const AddExcercise = ({ addExcerProps }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [listItem, setListItem] = useState(null);
  const [imgId, setImgId] = useState("");

  const fetchExcerListRef = useRef(false);
  const togglePublic = () => setIsPublic(!isPublic);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChanged = event => {
    const file = event.target.files;
    if (file[0].size >= 500000) {
      return false;
    }
    _corePostUpload(uploadFileItem, { file: file[0], name: "food_item" }).then(
      res => {
        if (res.code === 200) {
          setImgId(res.data.id);
        }
      }
    );
  };

  const getAllCategoryList = () => {
    _corePostFunc(listCategory, {
      page: 1,
      perPage: 100,
      type: "EXERCISE",
    }).then(res => {
      if (res.code === 200) {
        setListItem(res.data);
      }
    });
  };

  const addExcerItem = payload => {
    const newPayload = {
      ...payload,
      imageId: imgId,
      isPublic: isPublic ? true : false,
    };
    addExcerProps.addItemInExcer(newPayload);
  };

  useEffect(() => {
    if (fetchExcerListRef.current) return;
    fetchExcerListRef.current = true;
    getAllCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={doc.cover_food_item_popup}>
      <div className={doc.add_food_pop_cover}>
        <span
          className={doc.closePopup}
          onClick={() => addExcerProps.toggleExcrPopup()}
        >
          <HiX />
        </span>
        <h3>Add Excercise</h3>
        <div className={doc.food_item_form_cover}>
          <form onSubmit={handleSubmit(addExcerItem)}>
            <label className={doc.food_itm}>
              <span>&nbsp;</span>
              <div className={doc.set_public}>
                <span
                  className={isPublic ? doc.bool_item_actv : doc.bool_item}
                  onClick={() => togglePublic()}
                ></span>
                <p>Public</p>
              </div>
            </label>
            <label className={doc.food_itm}>
              <span>Excercise Category</span>
              <select {...register("categoryId")}>
                <option>Choose option</option>
                {listItem &&
                  listItem.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className={doc.food_itm}>
              <span>Name</span>
              <input type="text" {...register("name")} />
            </label>
            <label className={doc.food_itm}>
              <span>Important Info</span>
              <div className={doc.food_wrap}>
                <div className={doc.item_food_inside}>
                  <input
                    type="text"
                    placeholder="Calories"
                    {...register("calories")}
                  />
                  <b>kcal</b>
                </div>
                <div className={doc.item_food_inside}>
                  <input
                    type="text"
                    placeholder="Duration"
                    {...register("duration")}
                  />
                </div>
                <div className={doc.item_food_inside}></div>
              </div>
            </label>
            <FileUpload handleChanged={handleChanged} />
            <label className={doc.food_itm}>
              <span>Description</span>
              <textarea {...register("description")} />
            </label>
            <label className={doc.food_itm}>
              <span>Special Instruction</span>
              <textarea {...register("specialInstruction")} />
            </label>
            <div className={doc.food_itm_btn}>
              <button type="submit">Add Excercise</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExcercise;
