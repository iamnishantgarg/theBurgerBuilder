import * as acionTypes from "./actionsTypes";
import axios from "../../axios-order";
export const addIngredient = (name) => {
  return {
    type: acionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: acionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: acionTypes.FETCH_INGREDIENTS_FAIL,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: acionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://burgerbuilder-7144d.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
