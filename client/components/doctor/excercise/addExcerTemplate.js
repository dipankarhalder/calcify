import { HiX } from "react-icons/hi";
import { useState } from "react";
import { dayName } from "@/mainStaticDataConfig";
import doc from "@/Doctor.module.scss";
import Sunday from "./days/sunday";
import Monday from "./days/monday";
import Tuesday from "./days/tuesday";
import Wednesday from "./days/wednesday";
import Thursday from "./days/thursday";
import Friday from "./days/friday";
import Saturday from "./days/saturday";

const AddExcerTemplate = ({ addTemplateProps }) => {
  const {
    listDietCategoryItems,
    toggleExcrTemp,
    listExcerData,
    addNewExcerTempolate,
  } = addTemplateProps;
  const [collectSunDays, setCollectSunDays] = useState({
    day: "SUNDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectMonDays, setCollectMonDays] = useState({
    day: "MONDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectTueDays, setCollectTueDays] = useState({
    day: "TUESDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectWedDays, setCollectWedDays] = useState({
    day: "WEDNESDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectThuDays, setCollectThuDays] = useState({
    day: "THURSDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectFriDays, setCollectFriDays] = useState({
    day: "FRIDAY",
    specialInstruction: "",
    items: [],
  });
  const [collectSatDays, setCollectSatDays] = useState({
    day: "SATURDAY",
    specialInstruction: "",
    items: [],
  });
  const [initName, setInitName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [dayItm, setDayItm] = useState("Sunday");

  const onhandleChangeDays = item => setDayItm(item);
  const isPublishedHandle = () => setIsChecked(!isChecked);

  const dayProps = {
    listDietCategoryItems,
    listExcerData,
    setCollectSunDays,
    setCollectMonDays,
    setCollectTueDays,
    setCollectWedDays,
    setCollectThuDays,
    setCollectFriDays,
    setCollectSatDays,
  };

  const addDietItem = () => {
    const payload = {
      name: initName,
      isPublic: isChecked,
      days: [
        collectSunDays,
        collectMonDays,
        collectTueDays,
        collectWedDays,
        collectThuDays,
        collectFriDays,
        collectSatDays,
      ],
    };
    addNewExcerTempolate(payload);
  };

  return (
    <div className={doc.cover_excer_popup}>
      <div className={doc.add_excer_cover}>
        <span className={doc.closePopup} onClick={() => toggleExcrTemp()}>
          <HiX />
        </span>
        <h3>Create Excercise Template</h3>
        <div className={doc.excer_cover}>
          <div className={doc.excer_row}>
            <div className={doc.diet_filed_item}>
              <p>
                Name of the excercise plan <b>*</b>
              </p>
              <input
                type="text"
                name="name"
                onChange={event => setInitName(event.target.value)}
                value={initName}
              />
            </div>
            <div className={doc.diet_filed_item}>
              <p>&nbsp;</p>
              <input
                type="checkbox"
                name="public"
                value="Public"
                checked={isChecked}
                onChange={isPublishedHandle}
              />
              <b>Public</b>
            </div>
          </div>
          <div className={doc.navigationLink}>
            <ul>
              {dayName.map(itm => (
                <li
                  key={itm.id}
                  onClick={() => onhandleChangeDays(itm.name)}
                  className={dayItm === itm.name ? doc.actvLst : ""}
                >
                  {itm.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={dayItm === "Sunday" ? doc.dayVisible : doc.dayNot}>
            <Sunday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Monday" ? doc.dayVisible : doc.dayNot}>
            <Monday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Tuesday" ? doc.dayVisible : doc.dayNot}>
            <Tuesday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Wednesday" ? doc.dayVisible : doc.dayNot}>
            <Wednesday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Thursday" ? doc.dayVisible : doc.dayNot}>
            <Thursday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Friday" ? doc.dayVisible : doc.dayNot}>
            <Friday dayProps={dayProps} />
          </div>
          <div className={dayItm === "Saturday" ? doc.dayVisible : doc.dayNot}>
            <Saturday dayProps={dayProps} />
          </div>
          <div className={doc.mainBtn}>
            <span className={doc.submitBtn} onClick={() => addDietItem()}>
              Submit
            </span>
            <span className={doc.cancelBtn} onClick={() => toggleExcrTemp()}>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExcerTemplate;
