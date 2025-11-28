import { Suspense } from "react";
import { lazy } from "@loadable/component";

const Logo = lazy(() => import("../shared/logo"));
const Navigate = lazy(() => import("../shared/navigate"));

import head from "../styles/shared/Header.module.scss";
import core from "../styles/modules/Core.module.scss";

const Header = ({ navType }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className={head.app_header}>
        <div className={core.app_container}>
          <div className={head.app_head_wrapper}>
            <Logo />
            <Navigate navType={navType} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Header;
