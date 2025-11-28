import { useForm } from "react-hook-form";
import admin from "../../../styles/modules/Admin.module.scss";
import { _corePostFunc } from "../../../config/coreServices";
import { addCategory } from "../../../config/apiEndpoint";

const AddCategory = ({ onGetCategoryList, categoryType }) => {
  const { register, handleSubmit, reset } = useForm();

  const onCategorySubmit = getItem => {
    const payload = {
      ...getItem,
      type: categoryType,
    };
    _corePostFunc(addCategory, payload).then(res => {
      if (res.code === 200) {
        onGetCategoryList(categoryType);
        reset();
      }
    });
  };

  return (
    <div className={admin.half_place}>
      <h4>{categoryType === "DIET" ? "Diet" : "Excercise"} Category</h4>
      <form onSubmit={handleSubmit(onCategorySubmit)}>
        <div className={admin.app_auth_field}>
          <label>
            <input {...register("name")} />
          </label>
        </div>
        <div className={admin.app_auth_btn}>
          <button type="submit">Add Category</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
