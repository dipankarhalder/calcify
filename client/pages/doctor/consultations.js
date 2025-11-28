import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import {
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiArrowSmRight,
} from "react-icons/hi";
import { Suspense, useState, useEffect, useRef } from "react";
import { _corePostFunc } from "@/coreServices";
import { availAddItem, availGetItem, availRemItem } from "@/apiEndpoint";
import { validateDoctor } from "@/authValidation";
import { lazy } from "@loadable/component";
import { STANDYEAR } from "@/commonVar";
import core from "@/Core.module.scss";
import doc from "@/Doctor.module.scss";

const Header = lazy(() => import("@/header"));
const AddSlotBook = lazy(() => import("@/doctor/consultation/addSlotBook"));

const Consultations = () => {
  const repeatDateRef = useRef(false);
  const [openSlotPop, setOpenSlotPop] = useState(false);
  const [dateItem, setDateItem] = useState([]);
  const [itemDate, setItemDate] = useState("");

  const countData = () => {
    setDateItem([]);
    for (let i = 0; i < 7; i++) {
      _corePostFunc(availGetItem, {
        page: 1,
        perPage: 140,
        date: moment().add(i, "d").format(STANDYEAR),
      }).then(res => {
        if (res.code === 200) {
          setDateItem(dateItem => [
            ...dateItem,
            {
              idx: i,
              date: moment().add(i, "d").format(STANDYEAR),
              dayName: moment().add(i, "d").format("dddd"),
              lists: res.data,
            },
          ]);
        }
      });
    }
  };

  const closeSlotPopup = () => {
    setItemDate("");
    setOpenSlotPop(false);
  };

  const openSlotSelectPopup = dateVal => {
    setItemDate(dateVal);
    setOpenSlotPop(true);
  };

  const addSlotInDate = payload => {
    _corePostFunc(availAddItem, payload).then(res => {
      if (res.code === 200) {
        countData();
        closeSlotPopup();
      }
    });
  };

  const deleteSlotWithDate = idItem => {
    const payload = {
      id: idItem,
    };
    _corePostFunc(availRemItem, payload).then(res => {
      if (res.code === 200) {
        countData();
      }
    });
  };

  useEffect(() => {
    if (repeatDateRef.current) return;
    repeatDateRef.current = true;
    countData();
    validateDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Head>
        <title>Consultations</title>
        <meta name="keywords" content="Consultations" />
        <meta name="description" content="Consultations" />
      </Head>
      <section className={core.app_core_layout}>
        <Header />
        <div className={doc.consultation_cover}>
          <div className={core.app_container}>
            <div className={doc.cover_consultation}>
              <h2>Create appointment slots for patient&apos;s</h2>
              {dateItem
                .sort((a, b) => a.idx - b.idx)
                .map(item => (
                  <div className={doc.wrap_itm} key={item.date}>
                    <div className={doc.consult_item_row}>
                      <h6>{item.dayName}</h6>
                      <h5>{moment(item.date).format("ll")}</h5>
                      <div className={doc.listSlotItemInArr}>
                        {item.lists.length ? (
                          item.lists.map(itm => (
                            <div
                              key={itm.id}
                              className={
                                itm.patientId
                                  ? doc.slotItem_list_booked
                                  : doc.slotItem_list
                              }
                            >
                              {itm.patientId !== null ? (
                                <Link href={`/doctor/patient/${itm.patientId}`}>
                                  <a>
                                    <div className={doc.slotTime}>
                                      <b>
                                        {moment(itm.slot.from).format("LT")}
                                      </b>
                                    </div>
                                    <span>
                                      <HiArrowSmRight />
                                    </span>
                                  </a>
                                </Link>
                              ) : (
                                <>
                                  <div className={doc.slotTime}>
                                    <b>{moment(itm.slot.from).format("LT")}</b>
                                  </div>
                                  <span
                                    onClick={() => deleteSlotWithDate(itm.id)}
                                    title="Delete"
                                  >
                                    <HiOutlineTrash />
                                  </span>
                                </>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className={doc.availSoltsItem}>
                            Add your slots
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={doc.addSlotBtns}>
                      <span onClick={() => openSlotSelectPopup(item)}>
                        <HiOutlinePlusCircle /> Add Slot
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {openSlotPop && (
          <AddSlotBook
            itemDate={itemDate}
            dateItem={dateItem}
            closeSlotPopup={closeSlotPopup}
            addSlotInDate={addSlotInDate}
          />
        )}
      </section>
    </Suspense>
  );
};

export default Consultations;
