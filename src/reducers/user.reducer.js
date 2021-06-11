import { userConstants } from "../actions/constants";

const initialState = {
  loading: false,
  error: null,
  message: "",
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,

        error: action.payload.error,
        loading: false,
      };
      break;

    default:
      break;
  }
  return state;
};
