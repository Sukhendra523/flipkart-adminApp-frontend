import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  products: productReducer,
});

export default rootReducers;
