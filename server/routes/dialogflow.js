const express = require("express");
const router = express.Router();

// dialogflow
const dialogflow = require("dialogflow");

// config
// const config = require("../config/key");

// const projectId = config.googleProjectID;
// const sessionId = config.dialogFlowSessionID;
// const languageCode = config.dialogFlowSessionLanguageCode;

require("dotenv").config();

const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESSION_ID;
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Text Query Route
router.post("/textQuery", async (req, res) => {
  // 클라이언트에서 오는 정보를 dialogflow API로 보내기
  // The text query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  res.send(result);
});

// Event Query Route
router.post("/eventQuery", async (req, res) => {
  // The text query request
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
        // The language used by the client
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  res.send(result);
});

module.exports = router;
