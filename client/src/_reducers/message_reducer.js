/* eslint-disable import/no-anonymous-default-export */
import { SAVE_MESSAGE } from "../_actions/types";

export default function (state = { messages: [] }, action) {
  switch (action.type) {
    // ...state -> state = {}
    // 메시지 저장 : message action에서 save message 정보 받기
    case SAVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    default:
      return state;
  }
}
