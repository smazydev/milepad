import React from "react";
import Logo from "../Logo/Logo";
import PadName from "../PadName/PadName";
import Navigations from "../Navigations/Navigations";
import MyHeader from "./Header.module.css";

const Header = () => {
  return (
    <div className={MyHeader.headerMain}>
      <Logo />
      <div className={MyHeader.headerCol}>
        <PadName />
        <Navigations />
      </div>
      <div className={MyHeader.titleBarButtons}>
      {/* /  <ShareModal /> */}
        {/* <UserAvatar /> */}
      </div>
    </div>
  );
};

export default Header;
