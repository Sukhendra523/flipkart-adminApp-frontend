import axios from "../helper/axios";
import { categoryConstansts } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
    try {
      const res = await axios.get("category/getCategories");
      const { categoryList } = res.data;
      if (res.status === 200) {
        dispatch({
          type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories: categoryList },
        });
      }
    } catch (error) {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post("/category/create", form);

      if (res.status === 201) {
        dispatch({
          type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
          payload: {
            parentId: res.data.category.parentId,
            category: res.data.category,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
        payload: {
          error: error,
        },
      });
    }
  };
};
