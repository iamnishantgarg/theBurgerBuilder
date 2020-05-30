import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Wrapper from "../../Wrapper/Wrapper";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI//Spinner/Spinner";
import withErrorHandler from "../../withErrorHander/withErrorHandler";
import { connect } from "react-redux";
// import * as actionsTypes from "../../store/actions/actionsTypes";
import * as burgerBuilderActions from "../../store/actions/index";
// import axios from "axios";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,

    error: null,
  };

  componentDidMount() {
    // axios
    //   .get("https://burgerbuilder-7144d.firebaseio.com/ingredients.json")
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error });
    //   });
  }

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((elm) => {
        return ingredients[elm];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    return sum > 0;
  };
  // addIngredienthandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchasable(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const oldPrice = this.state.totalPrice;
  //   let newPrice = oldPrice;
  //   let newCount = oldCount;
  //   if (oldCount > 0) {
  //     newCount = oldCount - 1;
  //     newPrice = oldPrice - INGREDIENT_PRICES[type];
  //   }
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = newCount;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchasable(updatedIngredients);
  // };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;

    let burger = this.state.error ? <p>Failed to load app</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purhcaseContinue={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    // Spinner check
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      return dispatch(burgerBuilderActions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      return dispatch(burgerBuilderActions.removeIngredient(ingName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
