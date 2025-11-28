import doc from "../../../../styles/modules/Doctor.module.scss";
import SelectItems from "../../../selectItems";
import { HiOutlinePlusCircle, HiChevronDown } from "react-icons/hi";

const SlotOne = ({
  firstFrom,
  firstTo,
  firstSelectFrom,
  firstSelectTo,
  timeDropDown,
  openRowTwo,
}) => {
  const selectToItem = timeDropDown.filter(
    item => firstFrom < item.value && item
  );

  return (
    <div className={doc.rowTimes}>
      <div className={doc.dropDownArea}>
        <p>From :</p>
        <SelectItems
          getOnChange={firstSelectFrom}
          title="time..."
          arrItem={timeDropDown}
        />
      </div>
      <div className={doc.dropDownArea}>
        <p>To :</p>
        {firstFrom === null ? (
          <div className={doc.blankSelect}>
            <p>Choose time...</p>
            <span>
              <HiChevronDown />
            </span>
          </div>
        ) : (
          <SelectItems
            getOnChange={firstSelectTo}
            title="time..."
            arrItem={selectToItem}
          />
        )}
      </div>
      {firstTo !== null && (
        <div className={doc.addNewSlotDrop}>
          <span onClick={() => openRowTwo()}>
            <HiOutlinePlusCircle />
          </span>
        </div>
      )}
    </div>
  );
};

export default SlotOne;
