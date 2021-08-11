import axios from "../helper/axios";
import { categoryConstansts, productConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get("/initialData");
    const { categories, products } = res.data;
    if (res.status === 200) {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    } else {
      console.log(res);
    }
  };
};
