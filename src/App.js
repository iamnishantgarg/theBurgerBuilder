import React, { Component } from "react";
import Layout from "./components/layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
