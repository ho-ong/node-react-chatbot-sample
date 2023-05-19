/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DIALOGFLOW_SERVER } from "../Config";
import { saveMessage } from "../../_actions/message_action";
import { Avatar, List } from "antd";
import { RobotOutlined, SmileTwoTone } from "@ant-design/icons";

// Sections
import Cards from "./Sections/Cards";
import Messages from "./Sections/Messages";

function Chatbot() {
  // redux dispatch
  const dispatch = useDispatch();

  // state
  const messagesFromRedux = useSelector((state) => state.message.messages);

  // onKeyPressHanlder
  const onKeyPressHanlder = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("입력이 필요합니다.");
      }

      textQuery(e.target.value);
      e.target.value = "";
    }
  };

  // 챗봇의 처음 메시지
  // dialogflow에서 설정한 intents 가져오기
  useEffect(() => {
    eventQuery("intro");
  }, []);

  // textQuery
  const textQuery = async (text) => {
    // 내가 보낼 메시지 처리
    let conversation = {
      who: "Me",
      content: {
        text: {
          text: text,
        },
      },
    };

    // dispatch
    dispatch(saveMessage(conversation));

    // 챗봇이 보낸 메시지 처리
    const textQueryVariables = {
      text,
    };

    try {
      // textQuery Route에 요청
      const res = await axios.post(
        `${DIALOGFLOW_SERVER}/textQuery`,
        textQueryVariables
      );

      for (let content of res.data.fulfillmentMessages) {
        conversation = {
          who: "ChatBot",
          content: content,
        };

        // dispatch
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "ChatBot",
        content: {
          text: {
            text: "오류가 발생했습니다.",
          },
        },
      };

      // dispatch
      dispatch(saveMessage(conversation));
    }
  };

  // eventQuery
  // 챗봇이 보낸 메시지 처리
  const eventQuery = async (event) => {
    const eventQueryVariables = {
      event,
    };

    try {
      // eventQuery Route에 요청
      const res = await axios.post(
        `${DIALOGFLOW_SERVER}/eventQuery`,
        eventQueryVariables
      );

      for (let content of res.data.fulfillmentMessages) {
        let conversation = {
          who: "ChatBot",
          content: content,
        };

        // dispatch
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "ChatBot",
        content: {
          text: {
            text: "오류가 발생했습니다.",
          },
        },
      };

      // dispatch
      dispatch(saveMessage(conversation));
    }
  };

  // renderCards
  const renderCards = (cards) => {
    return cards.map((card, i) => (
      <Cards key={i} cardInfo={card.structValue} />
    ));
  };

  // renderOneMessage
  const renderOneMessage = (message, i) => {
    // 메시지 종류 구분
    if (message.content && message.content.text && message.content.text.text) {
      // 텍스트 메시지
      return (
        <Messages key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {
      // 카드 메시지
      const AvatarSrc =
        message.who === "ChatBot" ? (
          <RobotOutlined />
        ) : (
          <SmileTwoTone twoToneColor="#eb2f96" />
        );

      return (
        <div>
          <List.Item className="chat-list">
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={renderCards(
                message.content.payload.fields.card.listValue.values
              )}
            />
          </List.Item>
        </div>
      );
    }
  };

  // renderMessage
  const renderMessage = (returnedMessages) => {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div className="chat-box">
      <div className="message-box">{renderMessage(messagesFromRedux)}</div>
      <input
        className="chat-input"
        placeholder="메시지를 입력해주세요."
        onKeyPress={onKeyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
