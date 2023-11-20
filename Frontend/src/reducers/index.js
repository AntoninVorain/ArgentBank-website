import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer"

const rootReducer = combineReducers({
  auth:userReducer,
})
export default rootReducer