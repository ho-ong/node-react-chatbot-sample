import { SAVE_MESSAGE } from "./types";

// 메세지 저장
export function saveMessage(dataToSubmit) {
  // save message 정보를 message reducer로 보내기
  return {
    type: SAVE_MESSAGE,
    payload: dataToSubmit,
  };
}
