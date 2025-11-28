import { useForm } from "react-hook-form";
import admin from "../../../styles/modules/Admin.module.scss";

import { _corePostFunc } from "../../../config/coreServices";
import { addDietType } from "../../../config/apiEndpoint";

const AddDietType = ({ onGetDietTypeList }) => {
  const { register, handleSubmit, reset } = useForm();

  const onDietTypeSubmit = payload => {
    _corePostFunc(addDietType, payload).then(res => {
      if (res.code === 200) {
        onGetDietTypeList(res);
        reset();
      }
    });
  };

  return (
    <div className={admin.half_place}>
      <h4>Diet Type</h4>
      <form onSubmit={handleSubmit(onDietTypeSubmit)}>
        <div className={admin.app_auth_field}>
          <label>
            <input {...register("name")} />
          </label>
        </div>
        <div className={admin.app_auth_btn}>
          <button type="submit">Add Diet type</button>
        </div>
      </form>
    </div>
  );
};

export default AddDietType;
