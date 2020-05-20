import React, { Component } from "react";
import classes from "./Orders.module.css";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHander/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        // console.log(res.data);

        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    // let orders = this.state.orders.forEach((o) => {
    //   return <Order />;
    // });
    // if (this.state.loading) orders = <Spinner />;
    let orders = this.state.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price.toFixed(2)}
      />
    ));
    if (this.state.loading) orders = <Spinner />;
    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
