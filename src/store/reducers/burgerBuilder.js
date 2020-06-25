import * as actionsTypes from "../actions/actionsTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,

          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.SET_INGREDIENTS:
      return {
        ...state,
        building: false,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
      };
    case actionsTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
export default reducer;
