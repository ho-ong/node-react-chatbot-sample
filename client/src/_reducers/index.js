import { combineReducers } from "redux";
import message from "./message_reducer";

// combineReducers -> rootReducer
// 하나로 합치기
const rootReducer = combineReducers({
  message, // message reducer
});

export default rootReducer;
