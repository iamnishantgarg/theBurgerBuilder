import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>{props.price.toFixed(2)}$</strong>
      </p>
      {controls.map((elm) => (
        <BuildControl
          key={elm.label}
          label={elm.label}
          added={() => props.ingredientAdded(elm.type)}
          removed={() => props.ingredientRemoved(elm.type)}
          disabled={props.disabled[elm.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
}
export default BuildControls;
