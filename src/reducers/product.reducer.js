import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_PRODUCT_SUCCESS:
      // const { parentId, category } = action.payload;
      state = {
        ...state,
        loading: false,
        products: [...state.products, action.payload.product],
        // categories: buildNewCategories(parentId, state.categories, category),
      };
      break;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...initialState,
      };
      break;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...initialState,
        products: action.payload.products,
      };

    default:
      break;
  }
  return state;
};
