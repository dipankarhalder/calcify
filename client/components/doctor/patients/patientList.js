import Link from "next/link";
import {
  HiDotsVertical,
  HiOutlineBookmark,
  HiOutlineServer,
} from "react-icons/hi";
import doct from "../../../styles/modules/Doctor.module.scss";

const PatientList = ({ listData }) => {
  return (
    <div className={doct.patient_list_item_cover}>
      {listData && listData.length ? (
        <ul>
          {listData.map(item => (
            <li key={item.id}>
              <Link href={`/doctor/patient/${item.id}`}>
                <a>
                  {item.firstName} {item.lastName}
                </a>
              </Link>
              <div className={doct.impt_btn}>
                <span>
                  <HiOutlineBookmark />
                </span>
                <span>
                  <HiDotsVertical />
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={doct.emptyContener}>
          <HiOutlineServer />
          <p>The container is empty</p>
        </div>
      )}
    </div>
  );
};

export default PatientList;
