import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import utilityReducer from "./utilityReducer";

export default combineReducers({
  form: formReducer,
  utility: utilityReducer
});
