import { useState } from "react";
import { HiOutlinePlus, HiOutlineFolder } from "react-icons/hi";
import pat from "@/Patient.module.scss";

const UploadFiles = () => {
  const [uploadedFilesList, setUploadedFilesList] = useState([]);

  const changedUpload = event => {
    setUploadedFilesList([...event.target.files]);
  };

  return (
    <div className={pat.downlaodFiles}>
      <h5>Documents</h5>
      <label className={pat.appUploadFiles}>
        <input
          type="file"
          id="categoryFile"
          accept="image/jpeg, image/png"
          onChange={changedUpload}
          multiple
        />
        <span>
          <HiOutlinePlus />
        </span>
      </label>
      {uploadedFilesList.length ? (
        <div className={pat.uploadListData}>
          {uploadedFilesList.map(item => (
            <div className={pat.uploadImgList} key={item.size}>
              <span>
                <HiOutlineFolder />
              </span>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={pat.noUpload}>No images upload...</p>
      )}
    </div>
  );
};

export default UploadFiles;
