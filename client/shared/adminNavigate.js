import Link from "next/link";
import { useRouter } from "next/router";
import admNav from "../styles/shared/Navigate.module.scss";

const AdminNavigate = () => {
  const router = useRouter();

  return (
    <div className={admNav.full_width_row}>
      <ul>
        <li
          className={
            router.pathname === "/admin/dashboard" ? admNav.navActv : ""
          }
        >
          <Link href="/admin/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/admin/category" ? admNav.navActv : ""
          }
        >
          <Link href="/admin/category">
            <a>Manage Category</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/admin/region" ? admNav.navActv : ""}
        >
          <Link href="/admin/region">
            <a>Manage Region</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/admin/diettype" ? admNav.navActv : ""
          }
        >
          <Link href="/admin/diettype">
            <a>Manage Diet Type</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavigate;
