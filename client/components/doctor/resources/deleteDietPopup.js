import { HiX, HiOutlineTrash } from "react-icons/hi";
import doc from "@/Doctor.module.scss";

const DeleteDietPopup = ({ deleteDietProps }) => {
  const { closeDeletePopup, deleteDietTemplate } = deleteDietProps;

  return (
    <div className={doc.deleteOverlayPopup}>
      <div className={doc.deleteWhiteArea}>
        <span className={doc.closePopup} onClick={() => closeDeletePopup()}>
          <HiX />
        </span>
        <div className={doc.deleteIcons}>
          <HiOutlineTrash />
        </div>
        <h3>Delete Diet Item</h3>
        <h5>Are you sure you want to delete the item?</h5>
        <p>You can&apos;t undo this action</p>
        <div className={doc.dietAction}>
          <span onClick={() => closeDeletePopup()}>Cancel</span>
          <span className={doc.delDiet} onClick={() => deleteDietTemplate()}>
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteDietPopup;
