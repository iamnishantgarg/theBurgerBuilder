import React from "react";
import Wrapper from "../../Wrapper/Wrapper";
import Button from "../UI/Button/Button";
function OrderSummary(props) {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Wrapper>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price: {props.price}$</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purhcaseContinue}>
        CONTINUE
      </Button>
    </Wrapper>
  );
}
export default OrderSummary;
