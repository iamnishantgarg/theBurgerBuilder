import * as acionTypes from "./actionsTypes";
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
