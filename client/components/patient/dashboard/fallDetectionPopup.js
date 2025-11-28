import * as yup from "yup";
import { HiX } from "react-icons/hi";
import { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pat from "../../../styles/modules/Patient.module.scss";
import ErrorMessage from "../../../shared/errorMessage";

const schema = yup
  .object({
    // age: yup.string().required("Please enter age"),
    diagnosis: yup.string().required("Please enter diagnosis"),
    sitToStand: yup.string().required("Please enter sit to stand"),
    standingUnsupported: yup
      .string()
      .required("Please enter standing unsupport"),
    sittingUnsupported: yup.string().required("Please enter sitting unsupport"),
    standingToSitting: yup
      .string()
      .required("Please enter standing to sitting"),
    transfers: yup
      .string()
      .required("Please enter transfers")
      .test("len", "Must be exactly 5 characters", val => val.length === 5),
    standingEyesClosed: yup.string().required("Please enter eyes closed"),
    standingFeet: yup.string().required("Please enter standing feet"),
    reachingOutstretched: yup.string().required("Please enter out stretched"),
    retrievingGround: yup.string().required("Please enter retrieving ground"),
    turningBehind: yup.string().required("Please enter turning behind"),
    turningDegrees: yup.string().required("Please enter turning degrees"),
    placingFootStool: yup.string().required("Please enter placing foot stool"),
    standingFootFront: yup
      .string()
      .required("Please enter standing foot front"),
    standingOneFoot: yup.string().required("Please enter standing one foot"),
  })
  .required();

const FallDetectionPopup = ({ fallDetectionProps }) => {
  const {
    toggleFallDetcPopup,
    addFallDetection,
    storeUserType,
    chooseUserType,
    callFromPage,
    btndis,
  } = fallDetectionProps;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const relInfo = JSON.parse(localStorage.getItem("relative"));
  const [totalScore, setTotalScore] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const contentJson = [
    {
      heading: "SITTING TO STANDING",
      intro:
        "INSTRUCTIONS: Please stand up. Try not to use your hand for support.",
      desc: [
        "able to stand without using hands and stabilize independently",
        "able to stand independently using hands",
        "able to stand using hands after several tries",
        "needs minimal aid to stand or stabilize",
        "needs moderate or maximal assist to stand",
      ],
    },
    {
      heading: "STANDING UNSUPPORTED",
      intro: "INSTRUCTIONS: Please stand for two minutes without holding on.",
      desc: [
        "able to stand safely for 2 minutes",
        "able to stand 2 minutes with supervision",
        "able to stand 30 seconds unsupported",
        "needs several tries to stand 30 seconds unsupported",
        "unable to stand 30 seconds unsupported",
      ],
    },
    {
      heading:
        "SITTING WITH BACK UNSUPPORTED BUT FEET SUPPORTED ON FLOOR OR ON A STOOL",
      intro:
        "INSTRUCTIONS: Please stand up. Try not to use your hand for support.",
      desc: [
        "able to stand without using hands and stabilize independently",
        "able to stand independently using hands",
        "able to stand using hands after several tries",
        "needs minimal aid to stand or stabilize",
        "needs moderate or maximal assist to stand",
      ],
    },
    {
      heading: "STANDING TO SITTING",
      intro:
        "INSTRUCTIONS: Please stand up. Try not to use your hand for support.",
      desc: [
        "able to stand without using hands and stabilize independently",
        "able to stand independently using hands",
        "able to stand using hands after several tries",
        "needs minimal aid to stand or stabilize",
        "needs moderate or maximal assist to stand",
      ],
    },
    {
      heading: "TRANSFERS",
      intro:
        "INSTRUCTIONS: Please stand up. Try not to use your hand for support.",
      desc: [
        "able to stand without using hands and stabilize independently",
        "able to stand independently using hands",
        "able to stand using hands after several tries",
        "needs minimal aid to stand or stabilize",
        "needs moderate or maximal assist to stand",
      ],
    },
  ];

  const addFraxScores = payload => {
    const newPay = {
      age: 70,
      // storeUserType === "SELF" || callFromPage === "FROMPAGE"
      //   ? userInfo.age
      //   : relInfo !== null
      //   ? moment(relInfo.dob, "YYYYMMDD").fromNow().split(" ")[0]
      //   : payload.age,
      sex: "M",
      // storeUserType === "SELF" || callFromPage === "FROMPAGE"
      //   ? userInfo.gender
      //   : payload.sex,
      diagnosis: payload.diagnosis,
      sitToStand: payload.sitToStand,
      standingUnsupported: payload.standingUnsupported,
      sittingUnsupported: payload.sittingUnsupported,
      standingToSitting: payload.standingToSitting,
      transfers: payload.transfers,
      standingEyesClosed: payload.standingEyesClosed,
      standingFeet: payload.standingFeet,
      reachingOutstretched: payload.reachingOutstretched,
      retrievingGround: payload.retrievingGround,
      turningBehind: payload.turningBehind,
      turningDegrees: payload.turningDegrees,
      placingFootStool: payload.placingFootStool,
      standingFootFront: payload.standingFootFront,
      standingOneFoot: payload.standingOneFoot,
      total: totalScore,
    };
    addFallDetection(newPay);
  };

  const closeThisPopup = () => {
    toggleFallDetcPopup();
    storeUserType === "SELF"
      ? chooseUserType("SELF")
      : callFromPage === "FROMPAGE"
      ? chooseUserType("")
      : chooseUserType("OTHER");
  };

  return (
    <div className={pat.wrapper_popup_overlay_fall}>
      <div className={pat.wrapper_white_sec_ost}>
        <span className={pat.closePop} onClick={() => closeThisPopup()}>
          <HiX />
        </span>
        <h3>Fall Detection Assessment</h3>
        <p className={pat.subPopTitle}>
          If you want to change any information while testing, please update
          your profile information.
        </p>
        <div className={pat.fall_info_form}>
          <div className={pat.left_info_ost}>
            <div className={pat.item_form_cover}>
              <form onSubmit={handleSubmit(addFraxScores)}>
                <label className={pat.frax_itm}>
                  <span>Inital Info</span>
                  <div className={pat.frax_wrap}>
                    <div className={pat.item_frax_inside}>
                      <input
                        type="text"
                        defaultValue={
                          storeUserType === "SELF" ||
                          callFromPage === "FROMPAGE"
                            ? userInfo.age
                            : relInfo !== null
                            ? moment(relInfo.dob, "YYYYMMDD")
                                .fromNow()
                                .split(" ")[0]
                            : ""
                        }
                        placeholder="Age"
                        {...register("age")}
                        disabled={
                          storeUserType === "SELF" ||
                          callFromPage === "FROMPAGE"
                            ? true
                            : relInfo !== null
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className={pat.item_frax_inside}>
                      <select
                        defaultValue={
                          storeUserType === "SELF" ||
                          callFromPage === "FROMPAGE"
                            ? userInfo.gender
                            : ""
                        }
                        disabled={
                          storeUserType === "SELF" ||
                          callFromPage === "FROMPAGE"
                            ? true
                            : false
                        }
                        {...register("sex")}
                        name="sex"
                      >
                        <option>Sex</option>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                      </select>
                    </div>
                    <div className={pat.item_frax_inside}>
                      <input
                        type="text"
                        placeholder="Diagnosis"
                        {...register("diagnosis")}
                      />
                    </div>
                  </div>
                  {errors.diagnosis?.type === "required" && (
                    <ErrorMessage message={errors.diagnosis?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Sitting to standing
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("sitToStand", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.sitToStand?.type === "required" && (
                    <ErrorMessage message={errors.sitToStand?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing unsupported
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingUnsupported", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingUnsupported?.type === "required" && (
                    <ErrorMessage
                      message={errors.standingUnsupported?.message}
                    />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Sitting Unsupported
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("sittingUnsupported", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.sittingUnsupported?.type === "required" && (
                    <ErrorMessage
                      message={errors.sittingUnsupported?.message}
                    />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing to sitting
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingToSitting", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingToSitting?.type === "required" && (
                    <ErrorMessage message={errors.standingToSitting?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Transfers
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("transfers", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.transfers?.type === "required" && (
                    <ErrorMessage message={errors.transfers?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing with eyes closed
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingEyesClosed", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingEyesClosed?.type === "required" && (
                    <ErrorMessage
                      message={errors.standingEyesClosed?.message}
                    />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing with feet together
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingFeet", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingFeet?.type === "required" && (
                    <ErrorMessage message={errors.standingFeet?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Reaching forward with outstretched arms
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("reachingOutstretched", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.reachingOutstretched?.type === "required" && (
                    <ErrorMessage
                      message={errors.reachingOutstretched?.message}
                    />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Retrieving object from floor
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("retrievingGround", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.retrievingGround?.type === "required" && (
                    <ErrorMessage message={errors.retrievingGround?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Turning to look behind
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("turningBehind", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.turningBehind?.type === "required" && (
                    <ErrorMessage message={errors.turningBehind?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Turning 360 degrees
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("turningDegrees", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.turningDegrees?.type === "required" && (
                    <ErrorMessage message={errors.turningDegrees?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Placing alternate foot on stool
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("placingFootStool", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.placingFootStool?.type === "required" && (
                    <ErrorMessage message={errors.placingFootStool?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing with one foot in front
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingFootFront", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingFootFront?.type === "required" && (
                    <ErrorMessage message={errors.standingFootFront?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>
                    <b>*</b> Standing on one foot
                  </span>
                  <input
                    type="text"
                    placeholder="0-4"
                    {...register("standingOneFoot", {
                      maxLength: 4,
                      onChange: e =>
                        setTotalScore(
                          parseInt(totalScore) + parseInt(e.target.value)
                        ),
                    })}
                  />
                  {errors.standingOneFoot?.type === "required" && (
                    <ErrorMessage message={errors.standingOneFoot?.message} />
                  )}
                </label>
                <label className={pat.frax_itm_lable}>
                  <span>Total :</span>
                  <b>{totalScore}</b>
                </label>
                {btndis ? (
                  <div className={pat.frax_itm_dis_btn}>
                    <span type="submit">Please wait...</span>
                  </div>
                ) : (
                  <div className={pat.frax_itm_btn}>
                    <button type="submit">Submit</button>
                  </div>
                )}
                <div className={pat.frax_cancel_btn}>
                  <span onClick={() => closeThisPopup()}>Cancel</span>
                </div>
              </form>
            </div>
          </div>
          <div className={pat.right_info_ost}>
            {contentJson.map((itm, idx) => (
              <div className={pat.row_ost} key={idx}>
                <h4>{itm.heading}</h4>
                <p>{itm.intro}</p>
                <ul>
                  {itm.desc.map((item, idxs) => (
                    <li key={idxs}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallDetectionPopup;
