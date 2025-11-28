import doc from "../../../../styles/modules/Doctor.module.scss";
import SelectItems from "../../../selectItems";
import { HiOutlinePlusCircle, HiChevronDown } from "react-icons/hi";

const SelectBoxTwo = ({
  firstTo,
  secondFrom,
  secondTo,
  timeDropDown,
  secondSelectFrom,
  secondSelectTo,
  openRowThree,
}) => {
  const selectFormItem = timeDropDown.filter(
    item => firstTo <= item.value && item
  );
  const selectToItem = timeDropDown.filter(
    item => secondFrom < item.value && item
  );

  return (
    <div className={doc.rowTimes}>
      <div className={doc.dropDownArea}>
        <p>From :</p>
        <SelectItems
          getOnChange={secondSelectFrom}
          title="time..."
          arrItem={selectFormItem}
        />
      </div>
      <div className={doc.dropDownArea}>
        <p>To :</p>
        {secondFrom === null ? (
          <div className={doc.blankSelect}>
            <p>Choose time...</p>
            <span>
              <HiChevronDown />
            </span>
          </div>
        ) : (
          <SelectItems
            getOnChange={secondSelectTo}
            title="time..."
            arrItem={selectToItem}
          />
        )}
      </div>
      {secondTo !== null && (
        <div className={doc.addNewSlotDrop}>
          <span onClick={() => openRowThree()}>
            <HiOutlinePlusCircle />
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectBoxTwo;
