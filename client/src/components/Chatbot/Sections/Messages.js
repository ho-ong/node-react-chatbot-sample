import React from "react";
import { Avatar, List } from "antd";
import { RobotOutlined, SmileTwoTone } from "@ant-design/icons";

function Messages(props) {
  const AvatarSrc =
    props.who === "ChatBot" ? (
      <RobotOutlined />
    ) : (
      <SmileTwoTone twoToneColor="#eb2f96" />
    );

  return (
    <List.Item className="chat-list">
      <List.Item.Meta
        avatar={<Avatar icon={AvatarSrc} />}
        title={props.who}
        description={props.text}
      />
    </List.Item>
  );
}

export default Messages;
