import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import utilityReducer from "./utilityReducer";
import cvReducer from './cvReducer';

export default combineReducers({
  form: formReducer,
  utility: utilityReducer,
  cv : cvReducer
});
