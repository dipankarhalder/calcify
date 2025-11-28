import { useState } from "react";
import { userType, patientType } from "@/mainStaticDataConfig";
import { HiChevronDown, HiOutlineSearch } from "react-icons/hi";
import doct from "../../../styles/modules/Doctor.module.scss";

const PatientFilter = ({ handlePaginationAndSearch, setInvitePat }) => {
  const [searchValue, setSearchValue] = useState("");
  const onFilterSearch = e => setSearchValue(e.target.value);
  const searchFilter = () => {
    handlePaginationAndSearch("", searchValue);
    setSearchValue("");
  };

  return (
    <div className={doct.app_doct_filter}>
      <h3>Filter :</h3>
      <label>
        <select>
          {userType.map(item => (
            <option key={item.id}>{item.label}</option>
          ))}
        </select>
        <HiChevronDown />
      </label>
      <label>
        <select>
          {patientType.map(item => (
            <option key={item.id}>{item.label}</option>
          ))}
        </select>
        <HiChevronDown />
      </label>
      <span className={doct.invite_btn} onClick={() => setInvitePat(true)}>
        Invite Patient
      </span>
      <div className={doct.serch_filter}>
        <label>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={e => onFilterSearch(e)}
            placeholder="Search Patients"
          />
          <span onClick={() => searchFilter()}>
            <HiOutlineSearch />
          </span>
        </label>
      </div>
    </div>
  );
};

export default PatientFilter;
