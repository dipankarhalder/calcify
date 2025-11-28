import { useState } from "react";
import moment from "moment";
import { HiX } from "react-icons/hi";
import { timeDropDown } from "../../../config/mainStaticDataConfig";
import { STANDDAY } from "@/commonVar";
import doc from "../../../styles/modules/Doctor.module.scss";
import SelectBoxOne from "./slots/selectBoxOne";
import SelectBoxTwo from "./slots/selectBoxTwo";
import SelectBoxThree from "./slots/selectBoxThree";
import SelectBoxFour from "./slots/selectBoxFour";

const AddSlotBook = ({ itemDate, dateItem, closeSlotPopup, addSlotInDate }) => {
  console.log(dateItem);
  const [disTwoRow, setDisTwoRow] = useState(false);
  const [disThreeRow, setDisThreeRow] = useState(false);
  const [disfourRow, setDisFourRow] = useState(false);
  const [firstRowSel, setFirstRowSel] = useState({ from: "", to: "" });
  const [secondRowSel, setSecondRowSel] = useState({ from: "", to: "" });
  const [thirdRowSel, setThirdRowSel] = useState({ from: "", to: "" });
  const [forthRowSel, setForthRowSel] = useState({ from: "", to: "" });

  const openRowTwo = () => setDisTwoRow(true);
  const openRowThree = () => setDisThreeRow(true);
  const openRowFour = () => setDisFourRow(true);

  const [firstFrom, setFirstFrom] = useState(null);
  const [firstTo, setFirstTo] = useState(null);
  const [secondFrom, setSecondFrom] = useState(null);
  const [secondTo, setSecondTo] = useState(null);
  const [thirdFrom, setThirdFrom] = useState(null);
  const [thirdTo, setThirdTo] = useState(null);
  const [forthFrom, setForthFrom] = useState(null);
  const [forthTo, setForthTo] = useState(null);

  const firstSelectFrom = valItem => {
    setFirstFrom(valItem);
    setFirstRowSel({ ...firstRowSel, from: `${itemDate.date}T${valItem}` });
  };
  const firstSelectTo = valItem => {
    setFirstRowSel({ ...firstRowSel, to: `${itemDate.date}T${valItem}` });
    setFirstTo(valItem);
  };
  const secondSelectFrom = valItem => {
    setSecondFrom(valItem);
    setSecondRowSel({ ...secondRowSel, from: `${itemDate.date}T${valItem}` });
  };
  const secondSelectTo = valItem => {
    setSecondRowSel({ ...secondRowSel, to: `${itemDate.date}T${valItem}` });
    setSecondTo(valItem);
  };
  const thirdSelectFrom = valItem => {
    setThirdFrom(valItem);
    setThirdRowSel({ ...thirdRowSel, from: `${itemDate.date}T${valItem}` });
  };
  const thirdSelectTo = valItem => {
    setThirdRowSel({ ...thirdRowSel, to: `${itemDate.date}T${valItem}` });
    setThirdTo(valItem);
  };
  const forthSelectFrom = valItem => {
    setForthFrom(valItem);
    setForthRowSel({ ...forthRowSel, from: `${itemDate.date}T${valItem}` });
  };
  const forthSelectTo = valItem => {
    setForthRowSel({ ...forthRowSel, to: `${itemDate.date}T${valItem}` });
    setForthTo(valItem);
  };

  const addSlotSelectBox = () => {
    const arrayItem = [firstRowSel, secondRowSel, thirdRowSel, forthRowSel];
    const filterArray = arrayItem.filter(item => item.from !== "" && item);
    const payload = {
      times: filterArray,
    };
    addSlotInDate(payload);
  };

  return (
    <div className={doc.overviewSlotBook}>
      <div className={doc.popupWhiteArea}>
        <span className={doc.closePopup} onClick={() => closeSlotPopup()}>
          <HiX />
        </span>
        <h3>
          Select schedule time for patient
          <p>
            {moment(itemDate.date).format(STANDDAY)} - ({itemDate.dayName})
          </p>
        </h3>
        <div className={doc.slotTimePick}>
          <div className={doc.coverTimeDropDown}>
            <SelectBoxOne
              firstFrom={firstFrom}
              firstTo={firstTo}
              timeDropDown={timeDropDown}
              firstSelectFrom={firstSelectFrom}
              firstSelectTo={firstSelectTo}
              openRowTwo={openRowTwo}
            />
            {disTwoRow && (
              <SelectBoxTwo
                firstTo={firstTo}
                secondFrom={secondFrom}
                secondTo={secondTo}
                timeDropDown={timeDropDown}
                secondSelectFrom={secondSelectFrom}
                secondSelectTo={secondSelectTo}
                openRowThree={openRowThree}
              />
            )}
            {disThreeRow && (
              <SelectBoxThree
                secondTo={secondTo}
                thirdFrom={thirdFrom}
                thirdTo={thirdTo}
                timeDropDown={timeDropDown}
                thirdSelectFrom={thirdSelectFrom}
                thirdSelectTo={thirdSelectTo}
                openRowFour={openRowFour}
              />
            )}
            {disfourRow && (
              <SelectBoxFour
                thirdTo={thirdTo}
                forthFrom={forthFrom}
                forthTo={forthTo}
                timeDropDown={timeDropDown}
                forthSelectFrom={forthSelectFrom}
                forthSelectTo={forthSelectTo}
              />
            )}
          </div>
          {firstRowSel.to !== "" ? (
            <div className={doc.slot_itm_btn}>
              <span onClick={() => addSlotSelectBox()}>Add Slots</span>
            </div>
          ) : (
            <div className={doc.slot_itm_btn_disable}>
              <span>Add Slots</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSlotBook;
