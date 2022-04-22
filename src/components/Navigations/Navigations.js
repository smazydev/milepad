import React from "react";
import MyNav from "./Navigations.module.css";
import { NavTab } from "../NavTab/NavTab";

const Navigations = () => {
  return (
    <div className={MyNav.navigationmain}>
      <NavTab />
    </div>
  );
};

export default Navigations;
