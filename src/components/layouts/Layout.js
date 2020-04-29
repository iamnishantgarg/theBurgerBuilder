import React, { Component } from "react";
import Wrapper from "../../Wrapper/Wrapper";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };
  render() {
    return (
      <Wrapper>
        <Toolbar clicked={this.sideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />

        <main className={classes.Content}>{this.props.children}</main>
      </Wrapper>
    );
  }
}

export default Layout;
