import { HiX } from "react-icons/hi";
import { useState } from "react";
import moment from "moment";
import doc from "@/Doctor.module.scss";
import { dayName } from "@/mainStaticDataConfig";
import DatePicker from "react-datepicker";
import { STANDYEAR } from "@/commonVar";
import Sunday from "./excerDays/sunday";
import Monday from "./excerDays/monday";
import Tuesday from "./excerDays/tuesday";
import Wednesday from "./excerDays/wednesday";
import Thursday from "./excerDays/thursday";
import Friday from "./excerDays/friday";
import Saturday from "./excerDays/saturday";

const AssignExcerPopup = ({ assignExcerProps }) => {
  const {
    patientId,
    occDate,
    toggleAssignEcxerPopup,
    listTemplateExcer,
    listExcerCategoryItems,
    listExcerData,
    assignTemplateExcer,
  } = assignExcerProps;
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
  const [isSelDate, setIsSelDate] = useState(false);
  const [showMainPart, setShowMainPart] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [findDay, setFindDay] = useState(dayName[0].name);
  const [filteredItem, setFilteredItem] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const isPublishedHandle = () => setIsChecked(!isChecked);
  const handleChangeDay = dayName => setFindDay(dayName);

  const handleSelectName = event => {
    const filteredData = listTemplateExcer.filter(
      item => item.name === event.target.value && item
    );
    setShowMainPart(true);
    setFilteredItem(filteredData);
    setSelectedName(event.target.value);
    setInitName(filteredData[0].name);
    setIsChecked(filteredData[0].isPublic);
  };

  const isDateRangeSelect = update => {
    if (update[1] !== null) {
      setIsSelDate(true);
    }
    setDateRange(update);
  };

  const dayProps = {
    listExcerCategoryItems,
    listExcerData,
    filteredItem,
    setCollectSunDays,
    setCollectMonDays,
    setCollectTueDays,
    setCollectWedDays,
    setCollectThuDays,
    setCollectFriDays,
    setCollectSatDays,
  };

  const assignExcerPlan = inVal => {
    const payload = {
      saveCloneToResource: inVal,
      patientId: patientId,
      startDate: moment(dateRange[0]).format(STANDYEAR),
      endDate: moment(dateRange[1]).format(STANDYEAR),
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
    assignTemplateExcer(payload);
  };

  return (
    <div className={doc.cover_excer_popup}>
      <div className={doc.add_excer_cover} style={{ width: "1100px" }}>
        <span
          className={doc.closePopup}
          onClick={() => toggleAssignEcxerPopup()}
        >
          <HiX />
        </span>
        <h3>Create or Assign Excercise</h3>
        <div className={doc.excer_cover}>
          <div className={doc.excer_row} style={{ marginBottom: "20px" }}>
            <div className={doc.diet_filed_item}>
              <p>
                Select from and to date <b>*</b>
              </p>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={update => isDateRangeSelect(update)}
                isClearable={true}
                minDate={new Date()}
                showDisabledMonthNavigation
              />
            </div>
            {isSelDate && (
              <div className={doc.diet_filed_item}>
                <p>Excercise template</p>
                <select value={selectedName} onChange={handleSelectName}>
                  <option>Choose Name...</option>
                  {listTemplateExcer.map(item => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {showMainPart &&
            filteredItem.map(item => (
              <div className={doc.assign_item_pop} key={item.id}>
                <div className={doc.diet_row_assign}>
                  <div className={doc.diet_filed_item}>
                    <p>Name of the excercise plan</p>
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
                <div className={doc.tab_assign_days}>
                  <div className={doc.tab_heading_days}>
                    <ul>
                      {dayName.map(itemDay => (
                        <li
                          key={itemDay.id}
                          className={
                            findDay === itemDay.name ? doc.actvLst : ""
                          }
                          onClick={() => handleChangeDay(itemDay.name)}
                        >
                          {itemDay.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={
                      findDay === dayName[0].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Sunday findDay={dayName[0].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[1].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Monday findDay={dayName[1].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[2].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Tuesday findDay={dayName[2].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[3].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Wednesday findDay={dayName[3].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[4].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Thursday findDay={dayName[4].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[5].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Friday findDay={dayName[5].name} dayProps={dayProps} />
                  </div>
                  <div
                    className={
                      findDay === dayName[6].name ? doc.dayVisible : doc.dayNot
                    }
                  >
                    <Saturday findDay={dayName[6].name} dayProps={dayProps} />
                  </div>
                  {occDate && <div className={doc.listOccDate}>{occDate}</div>}
                  <div className={doc.assignBtnItem}>
                    {/* <span className={doc.apply} onClick={() => saveDraftAllItems()}>Apply</span> */}
                    {/* {disableMainBtn ? (
                      <span className={doc.notActv}>
                        Assign Diet Template
                      </span>
                    ) : ( */}
                    <span
                      className={doc.nowActv}
                      onClick={() => assignExcerPlan(false)}
                    >
                      Assign Excercise Template
                    </span>
                    {/* )} */}
                    {/* {disableMainBtn ? (
                      <span className={doc.notActv}>
                        Assign &amp; Save Template
                      </span>
                    ) : ( */}
                    <span
                      className={doc.nowActv}
                      onClick={() => assignExcerPlan(true)}
                    >
                      Assign &amp; Save Template
                    </span>
                    {/* )} */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AssignExcerPopup;
