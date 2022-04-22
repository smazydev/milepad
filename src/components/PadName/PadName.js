import { useState } from "react";
import MyPadName from "./PadName.module.css";

const SheetName = () => {
  const [gridTitle, setGridTitle] = useState("Untitled Milepad");
  
  return (
    <div className={MyPadName['title-container']}>
    <h1 className={MyPadName['title']}>{gridTitle}</h1>
    </div>
  );
};

export default SheetName;
