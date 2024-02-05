import axios from "axios";

export const createToken = async (sessionId: string) => {
  const response = await axios.post(
    process.env.REACT_APP_WEBSOCKET_SERVER_URL +
      "api/sessions/" +
      sessionId +
      "/connections",
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The token
};

export const createSession = async (sessionId: string) => {
  const response = await axios.post(
    process.env.REACT_APP_WEBSOCKET_SERVER_URL + "api/sessions",
    { customSessionId: sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The sessionId
};
