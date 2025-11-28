import doc from "../../../../styles/modules/Doctor.module.scss";
import SelectItems from "../../../selectItems";
import { HiOutlinePlusCircle, HiChevronDown } from "react-icons/hi";

const SelectBoxThree = ({
  secondTo,
  thirdFrom,
  thirdTo,
  timeDropDown,
  thirdSelectFrom,
  thirdSelectTo,
  openRowFour,
}) => {
  const selectFormItem = timeDropDown.filter(
    item => secondTo <= item.value && item
  );
  const selectToItem = timeDropDown.filter(
    item => thirdFrom < item.value && item
  );

  return (
    <div className={doc.rowTimes}>
      <div className={doc.dropDownArea}>
        <p>From :</p>
        <SelectItems
          getOnChange={thirdSelectFrom}
          title="time..."
          arrItem={selectFormItem}
        />
      </div>
      <div className={doc.dropDownArea}>
        <p>To :</p>
        {thirdFrom === null ? (
          <div className={doc.blankSelect}>
            <p>Choose time...</p>
            <span>
              <HiChevronDown />
            </span>
          </div>
        ) : (
          <SelectItems
            getOnChange={thirdSelectTo}
            title="time..."
            arrItem={selectToItem}
          />
        )}
      </div>
      {thirdTo !== null && (
        <div className={doc.addNewSlotDrop}>
          <span onClick={() => openRowFour()}>
            <HiOutlinePlusCircle />
          </span>
        </div>
      )}
    </div>
  );
};

export default SelectBoxThree;
