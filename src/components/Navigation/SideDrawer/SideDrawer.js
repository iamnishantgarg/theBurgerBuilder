import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
// import Modal from "../../UI/Modal/Modal";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../Auxi/Aux";
import NavigationItems from "../NavigationItems/NavigationItems";
function SideDrawer(props) {
  var attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" className={classes.Logo} />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;
