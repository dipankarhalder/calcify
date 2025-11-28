import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { HiChevronDown, HiOutlineExternalLink } from "react-icons/hi";
import nav from "../styles/shared/Navigate.module.scss";
import {
  HOME,
  ABOUT,
  CONTACT,
  DOCTOR_DASHBOARD,
  DOCTOR_PATIENTS,
  DOCTOR_CONSULT,
  DOCTOR_DIET,
  DOCTOR_THERAP,
  DOCTOR_NORM,
  DOCTOR_RESEARCH,
  LOGIN_PATIENT,
  LOGIN_DOCTOR,
} from "@/coreRoutes";

const Navigate = () => {
  const router = useRouter();
  const userToken = localStorage.getItem("authToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const _logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    router.push(HOME);
  };

  const _adminLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    router.push("/admin/login");
  };

  return (
    <div className={nav.app_navigate}>
      {userToken ? (
        <Fragment>
          {userInfo.role === "DOCTOR" ||
          userInfo.role === "DOCTOR_NORMAL" ||
          userInfo.role === "DOCTOR_DIETICIAN" ||
          userInfo.role === "DOCTOR_THERAPIST" ? (
            <ul>
              <li
                className={
                  router.pathname === DOCTOR_DASHBOARD ? nav.navActv : ""
                }
              >
                <Link href={DOCTOR_DASHBOARD}>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === DOCTOR_PATIENTS ? nav.navActv : ""
                }
              >
                <Link href={DOCTOR_PATIENTS}>
                  <a>Patients</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === DOCTOR_CONSULT ? nav.navActv : ""
                }
              >
                <Link href={DOCTOR_CONSULT}>
                  <a>Consultations</a>
                </Link>
              </li>
              <li>
                <span className={nav.al_center}>
                  Resources <HiChevronDown />
                </span>
                <div className={nav.dropdwn}>
                  <ul>
                    {userInfo.role === "DOCTOR_DIETICIAN" && (
                      <li
                        className={
                          router.pathname === DOCTOR_DIET ? nav.navActv : ""
                        }
                      >
                        <Link href={DOCTOR_DIET}>
                          <a>Diet Items</a>
                        </Link>
                      </li>
                    )}
                    {userInfo.role === "DOCTOR_THERAPIST" && (
                      <li
                        className={
                          router.pathname === DOCTOR_THERAP ? nav.navActv : ""
                        }
                      >
                        <Link href={DOCTOR_THERAP}>
                          <a>Excercise</a>
                        </Link>
                      </li>
                    )}
                    {userInfo.role === "DOCTOR_NORMAL" && (
                      <li
                        className={
                          router.pathname === DOCTOR_NORM ? nav.navActv : ""
                        }
                      >
                        <Link href={DOCTOR_NORM}>
                          <a>Medicine</a>
                        </Link>
                      </li>
                    )}
                    <li
                      className={
                        router.pathname === DOCTOR_RESEARCH ? nav.navActv : ""
                      }
                    >
                      <Link href={DOCTOR_RESEARCH}>
                        <a>Research</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <span onClick={() => _logout()}>Logout</span>
              </li>
            </ul>
          ) : userInfo.role === "PATIENT" ? (
            <ul>
              <li
                className={
                  router.pathname === "/patient/dashboard" ? nav.navActv : ""
                }
              >
                <Link href="/patient/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/medicine" ? nav.navActv : ""
                }
              >
                <Link href="/patient/medicine">
                  <a>Medicine</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/diet" ? nav.navActv : ""
                }
              >
                <Link href="/patient/diet">
                  <a>Diet</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/exercise" ? nav.navActv : ""
                }
              >
                <Link href="/patient/exercise">
                  <a>Exercise</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/consultations"
                    ? nav.navActv
                    : ""
                }
              >
                <Link href="/patient/consultations">
                  <a>Consultations</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/blog" ? nav.navActv : ""
                }
              >
                <Link href="/patient/blog">
                  <a>Blogs</a>
                </Link>
              </li>
              <li
                className={
                  router.pathname === "/patient/faq" ? nav.navActv : ""
                }
              >
                <Link href="/patient/faq">
                  <a>FAQ</a>
                </Link>
              </li>
              <li>
                <span onClick={() => _logout()}>Logout</span>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <span onClick={() => _adminLogout()}>Logout</span>
              </li>
            </ul>
          )}
        </Fragment>
      ) : (
        <ul>
          <li className={router.pathname === HOME ? nav.navActv : ""}>
            <Link href={HOME}>
              <a>Home</a>
            </Link>
          </li>
          <li className={router.pathname === ABOUT ? nav.navActv : ""}>
            <Link href={ABOUT}>
              <a>About</a>
            </Link>
          </li>
          <li className={router.pathname === CONTACT ? nav.navActv : ""}>
            <Link href={CONTACT}>
              <a>Contact</a>
            </Link>
          </li>
          <li>
            <span className={nav.al_center}>
              <a>Login</a>
            </span>
            <div className={nav.dropdwn} style={{ width: "120px" }}>
              <ul>
                <li
                  className={
                    router.pathname === LOGIN_PATIENT ? nav.navActv : ""
                  }
                >
                  <Link href={LOGIN_PATIENT}>
                    <a>Patient Login</a>
                  </Link>
                </li>
                <li
                  className={
                    router.pathname === LOGIN_DOCTOR ? nav.navActv : ""
                  }
                >
                  <Link href={LOGIN_DOCTOR}>
                    <a>Doctor Login</a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      )}
      <span className={nav.surveyLink} title="Calcify Survey">
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf3QtfNlRJcdnI4BUNkpeAF5BH1MWMxG_8vTVFfqpzz2pGD2A/viewform">
          <a rel="noopener noreferrer" target="_blank">
            <HiOutlineExternalLink />
          </a>
        </Link>
      </span>
    </div>
  );
};

export default Navigate;
