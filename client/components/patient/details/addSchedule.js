import { HiX } from "react-icons/hi";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import pat from "../../../styles/modules/Patient.module.scss";
import { _corePostFunc } from "../../../config/coreServices";
import { availGetItem } from "../../../config/apiEndpoint";

const AddSchedule = ({ setAddSchPopup, bookSlotAppointment }) => {
  const repeatDateRef = useRef(false);
  const [dateItem, setDateItem] = useState([]);
  const [timeItem, setTimeItem] = useState([]);
  const [dateSelect, setDateSelect] = useState("");
  const [timeSelect, setTimeSelect] = useState("");
  const [noteText, setNoteText] = useState("");

  const dateCountItems = () => {
    for (let i = 0; i < 7; i++) {
      setDateItem(dateItem => [
        ...dateItem,
        {
          id: i,
          value: moment().add(i, "d").format("YYYY-MM-DD"),
          label: `${moment().add(i, "d").format("DD-MM-YYYY")} - ${moment()
            .add(i, "d")
            .format("dddd")}`,
        },
      ]);
    }
  };

  const getSlotItemsBasedOnDate = dataItem => {
    _corePostFunc(availGetItem, {
      page: 1,
      perPage: 60,
      date: dataItem,
    }).then(res => {
      if (res.code === 200) {
        setTimeItem(res.data);
      }
    });
  };

  const bookAppointment = () => {
    const payload = {
      slotId: timeSelect,
      note: noteText,
    };
    bookSlotAppointment(payload);
  };

  useEffect(() => {
    if (repeatDateRef.current) return;
    repeatDateRef.current = true;
    dateCountItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={pat.popupOverlay}>
      <div className={pat.whiteAreaSec}>
        <span className={pat.closePop} onClick={() => setAddSchPopup(false)}>
          <HiX />
        </span>
        <h3>Patient Appointment Form</h3>
        <div className={pat.booking_area}>
          <div className={pat.filedRow}>
            <span>Date</span>
            <div className={pat.selBox}>
              <select
                onChange={event => {
                  setTimeSelect("");
                  setDateSelect(event.target.value);
                  getSlotItemsBasedOnDate(event.target.value);
                }}
              >
                <option>Choose date...</option>
                {dateItem.map(item => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={pat.filedRow}>
            <span>Time</span>
            <div className={pat.selBox}>
              {dateSelect === "" ? (
                <div className={pat.boxSect}>Select Date</div>
              ) : timeItem.length ? (
                <select
                  value={timeSelect}
                  onChange={event => setTimeSelect(event.target.value)}
                >
                  <option>Choose time...</option>
                  {timeItem.map(item => (
                    <option key={item.id} value={item.id}>
                      {moment(item.slot.from).format("LT")}
                    </option>
                  ))}
                </select>
              ) : (
                <div className={pat.boxSect}>Slot not available</div>
              )}
            </div>
          </div>
          <div className={pat.filedRow}>
            <span>Note</span>
            <div className={pat.selBox}>
              <textarea
                value={noteText}
                onChange={event => setNoteText(event.target.value)}
              />
            </div>
          </div>
          {timeSelect === "" || !timeItem.length ? (
            <div className={pat.filedRow}>
              <div className={pat.btnBookDis}>Book Appointment</div>
            </div>
          ) : (
            <div className={pat.filedRow}>
              <div className={pat.btnBook} onClick={() => bookAppointment()}>
                Book Appointment
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
