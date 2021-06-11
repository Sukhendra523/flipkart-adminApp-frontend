import axios from "../helper/axios";
import { productConstants } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });

    try {
      const res = await axios.post("/product/create", form);
      console.log(res);
      if (res.status === 201) {
        dispatch({
          type: productConstants.ADD_PRODUCT_SUCCESS,
          payload: {
            product: res.data.product,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
