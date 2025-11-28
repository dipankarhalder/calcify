import { useForm } from "react-hook-form";
import admin from "../../../styles/modules/Admin.module.scss";

import { _corePostFunc } from "../../../config/coreServices";
import { addRegion } from "../../../config/apiEndpoint";

const AddRegion = ({ onGetRegionList }) => {
  const { register, handleSubmit, reset } = useForm();

  const onRegionSubmit = payload => {
    _corePostFunc(addRegion, payload).then(res => {
      if (res.code === 200) {
        onGetRegionList();
        reset();
      }
    });
  };

  return (
    <div className={admin.half_place}>
      <h4>Region</h4>
      <form onSubmit={handleSubmit(onRegionSubmit)}>
        <div className={admin.app_auth_field}>
          <label>
            <input {...register("name")} />
          </label>
        </div>
        <div className={admin.app_auth_btn}>
          <button type="submit">Add Region</button>
        </div>
      </form>
    </div>
  );
};

export default AddRegion;
