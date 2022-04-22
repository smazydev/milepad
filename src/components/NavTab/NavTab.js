import React from "react";
import { Menu, Dropdown } from "antd";
import classes from "./NavTab.module.css";
import SubMenu from "antd/lib/menu/SubMenu";
import { MenuItem } from "rc-menu";

export const NavTab = () => {
  const menu = (
    <Menu>
      <SubMenu key="sub1" title="Import File (.xlsx)">
        <MenuItem key="sub1.1">
          <input
            className={classes["upload-input"]}
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id="fileSelect"
            runat="server"
          />
        </MenuItem>
      </SubMenu>
      <SubMenu key="sub2" title="Export As">
        <MenuItem key="sub2.1">Export (.xlsx)</MenuItem>
        <MenuItem key="sub2.2">Export (.ods)</MenuItem>
        <MenuItem key="sub2.3">Export (.csv)</MenuItem>
        <MenuItem key="sub2.4">Export (.html)</MenuItem>
        <MenuItem key="sub2.5">Export (.pdf)</MenuItem>
      </SubMenu>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <div
          className={classes.navTabButton}
          onClick={(e) => e.preventDefault()}
        >
          File
        </div>
      </Dropdown>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <div
          className={classes.navTabButton}
          onClick={(e) => e.preventDefault()}
        >
          Edit
        </div>
      </Dropdown>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <div
          className={classes.navTabButton}
          onClick={(e) => e.preventDefault()}
        >
          View
        </div>
      </Dropdown>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <div
          className={classes.navTabButton}
          onClick={(e) => e.preventDefault()}
        >
          Insert
        </div>
      </Dropdown>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <div
          className={classes.navTabButton}
          onClick={(e) => e.preventDefault()}
        >
          Format
        </div>
      </Dropdown>
    </>
  );
};
