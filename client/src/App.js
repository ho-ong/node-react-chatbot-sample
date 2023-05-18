import React from "react";
import { RobotOutlined } from "@ant-design/icons";

// components
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  return (
    <div>
      <div className="container-center chat-title">
        <h2>
          ChatBot <RobotOutlined />
        </h2>
      </div>
      <div className="container-center">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
