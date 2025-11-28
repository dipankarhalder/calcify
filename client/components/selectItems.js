import { useState } from "react";
import { HiChevronDown, HiX } from "react-icons/hi";
import Core from "../styles/modules/Core.module.scss";

const SelectItems = ({ title = "item...", arrItem, getOnChange }) => {
  const [openDrop, setOpenDrop] = useState(false);
  const [selValue, setSelValue] = useState("");

  const openDropDownList = () => setOpenDrop(!openDrop);
  const closeDropDownList = () => setOpenDrop(false);

  const selValueAndClose = item => {
    setSelValue(item);
    getOnChange(item.value);
    closeDropDownList();
  };

  return (
    <div className={Core.mainSelCover}>
      <div className={Core.selectMainView}>
        <p onClick={() => openDropDownList()}>
          {selValue ? selValue.label : `Choose ${title}`}
        </p>
        {openDrop ? (
          <span className={Core.closeDd} onClick={() => closeDropDownList()}>
            <HiX />
          </span>
        ) : (
          <span>
            <HiChevronDown />
          </span>
        )}
      </div>
      {openDrop && (
        <div className={Core.selBody}>
          {arrItem.length && (
            <ul>
              {arrItem.map((item, idx) => (
                <li key={idx} onClick={() => selValueAndClose(item)}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectItems;
