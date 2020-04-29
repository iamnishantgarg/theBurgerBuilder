import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Wrapper from "../../Wrapper/Wrapper";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };
  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((elm) => {
        return ingredients[elm];
      })
      .reduce((sum, elm) => {
        return sum + elm;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  addIngredienthandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice;
    let newCount = oldCount;
    if (oldCount > 0) {
      newCount = oldCount - 1;
      newPrice = oldPrice - INGREDIENT_PRICES[type];
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    alert("You Continued");
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purhcaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredienthandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Wrapper>
    );
  }
}

export default BurgerBuilder;
