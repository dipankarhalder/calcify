import core from "../styles/modules/Core.module.scss";
import { HiOutlineInboxIn } from "react-icons/hi";
import { useState } from "react";

const FileUpload = ({ handleChanged }) => {
  const [fileDetails, setFileDetails] = useState(null);

  const changedUpload = event => {
    handleChanged(event);
    const file = event.target.files;
    setFileDetails(file[0]);
  };

  return (
    <div className={core.appUploadField}>
      <span>Upload Image</span>
      <label className={core.appFiles}>
        <input
          type="file"
          id="categoryFile"
          accept="image/jpeg, image/png"
          onChange={changedUpload}
        />
        <div className={core.uploadItmeData}>
          <span>
            <HiOutlineInboxIn />
          </span>
          {fileDetails !== null ? (
            <p>{fileDetails.name}</p>
          ) : (
            <p>Choose or browse files...</p>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
