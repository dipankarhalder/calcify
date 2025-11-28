import { HiX } from "react-icons/hi";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../shared/errorMessage";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import doc from "@/Doctor.module.scss";
import { RESEARCH } from "@/commonVar";
import { _corePostUpload } from "@/coreServices";
import { uploadFileItem } from "@/apiEndpoint";
import FileUpload from "@/fileUpload";

const schema = yup
  .object({
    title: yup.string().required("Please enter article title"),
  })
  .required();

const AddResearch = ({ addNewResearchItem, toggleResearchPopup }) => {
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
    _corePostUpload(uploadFileItem, {
      file: file[0],
      name: "research_item",
    }).then(res => {
      if (res.code === 200) {
        setimgId([...imgId, res.data.id]);
        reset();
      }
    });
  };

  const addReschItem = payload => {
    if (contentEdit === null) {
      return setErrEdit("Please enter article content");
    }

    const newPayload = {
      ...payload,
      files: imgId,
      content: contentEdit.data,
      type: RESEARCH,
    };
    addNewResearchItem(newPayload);
  };

  return (
    <div className={doc.popupAddRes}>
      <div className={doc.coverWhiteArea}>
        <span className={doc.closePopup} onClick={() => toggleResearchPopup()}>
          <HiX />
        </span>
        <h3>Research Form</h3>
        <div className={doc.addResearchForm}>
          <form onSubmit={handleSubmit(addReschItem)}>
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
              <button type="submit">Add Research</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResearch;
