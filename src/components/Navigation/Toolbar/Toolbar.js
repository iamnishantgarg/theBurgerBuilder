import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";
function Toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked} />
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}
export default Toolbar;
