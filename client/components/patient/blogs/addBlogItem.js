import { HiX } from "react-icons/hi";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../shared/errorMessage";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import doc from "../../../styles/modules/Doctor.module.scss";
import { _corePostUpload } from "../../../config/coreServices";
import { uploadFileItem } from "../../../config/apiEndpoint";
import FileUpload from "../../fileUpload";

const schema = yup
  .object({
    title: yup.string().required("Please enter blog title"),
  })
  .required();

const AddBlogItem = ({ addNewBlogsItem, toggleOpenAddBlogPop }) => {
  const [imgId, setimgId] = useState([]);
  const [contentEdit, setContentEdit] = useState(null);
  const [errEdit, setErrEdit] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChanged = event => {
    const file = event.target.files;
    if (file[0].size >= 500000) {
      return false;
    }
    _corePostUpload(uploadFileItem, { file: file[0], name: "blogs_item" }).then(
      res => {
        if (res.code === 200) {
          setimgId([...imgId, res.data.id]);
          reset();
        }
      }
    );
  };

  const addBlogShowItem = payload => {
    if (contentEdit === null) {
      return setErrEdit("Please enter article content");
    }

    const newPayload = {
      ...payload,
      files: imgId,
      content: contentEdit.data,
      type: "BLOG",
    };
    addNewBlogsItem(newPayload);
  };

  return (
    <div className={doc.popupAddRes}>
      <div className={doc.coverWhiteArea}>
        <span className={doc.closePopup} onClick={() => toggleOpenAddBlogPop()}>
          <HiX />
        </span>
        <h3>Blog Form</h3>
        <div className={doc.addResearchForm}>
          <form onSubmit={handleSubmit(addBlogShowItem)}>
            <FileUpload handleChanged={handleChanged} />
            <label className={doc.editorArea}>
              <span>Heading</span>
              <div className={doc.appInput}>
                <input type="text" {...register("title")} />
                {errors.title?.type === "required" && (
                  <ErrorMessage message={errors.title?.message} />
                )}
              </div>
            </label>
            <div className={doc.editorArea}>
              <span>Editor</span>
              <div className={doc.appInput}>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContentEdit({ event, editor, data });
                    setErrEdit("");
                  }}
                />
                {errEdit && <ErrorMessage message={errEdit} />}
              </div>
            </div>
            <div className={doc.addResearchForm}>
              <button type="submit">Add Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogItem;
