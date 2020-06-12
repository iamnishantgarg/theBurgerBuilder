import React, { Component } from "react";
import classes from "./Orders.module.css";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHander/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };
  componentDidMount() {
    // axios
    //   .get("/orders.json")
    //   .then((res) => {
    //     // console.log(res.data);

    //     let fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({ ...res.data[key], id: key });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ loading: false });
    //   });
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    // let orders = this.state.orders.forEach((o) => {
    //   return <Order />;
    // });
    // if (this.state.loading) orders = <Spinner />;
    let orders = this.props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price.toFixed(2)}
      />
    ));
    if (this.props.loading) orders = <Spinner />;
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    onFetchOrders: (token) => dispath(actions.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
