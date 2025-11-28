import Link from "next/link";
import logo from "../styles/shared/Logo.module.scss";

const Logo = () => {
  return (
    <div className={logo.app_logo}>
      <Link href="/">
        <a>Calcify</a>
      </Link>
    </div>
  );
};

export default Logo;