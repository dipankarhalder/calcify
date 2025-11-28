import doc from "../../../../styles/modules/Doctor.module.scss";
import SelectItems from "../../../selectItems";
import { HiChevronDown } from "react-icons/hi";

const SelectBoxFour = ({
  thirdTo,
  forthFrom,
  forthTo,
  timeDropDown,
  forthSelectFrom,
  forthSelectTo,
}) => {
  const selectFormItem = timeDropDown.filter(
    item => thirdTo <= item.value && item
  );
  const selectToItem = timeDropDown.filter(
    item => forthFrom < item.value && item
  );

  return (
    <div className={doc.rowTimes}>
      <div className={doc.dropDownArea}>
        <p>From :</p>
        <SelectItems
          getOnChange={forthSelectFrom}
          title="time..."
          arrItem={selectFormItem}
        />
      </div>
      <div className={doc.dropDownArea}>
        <p>To :</p>
        {forthFrom === null ? (
          <div className={doc.blankSelect}>
            <p>Choose time...</p>
            <span>
              <HiChevronDown />
            </span>
          </div>
        ) : (
          <SelectItems
            getOnChange={forthSelectTo}
            title="time..."
            arrItem={selectToItem}
          />
        )}
      </div>
    </div>
  );
};

export default SelectBoxFour;
