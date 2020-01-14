import { combineReducers } from "redux";
import utilityReducer from "./utilityReducer";
import cvReducer from './cvReducer';

export default combineReducers({
  utility: utilityReducer,
  cv : cvReducer
});
