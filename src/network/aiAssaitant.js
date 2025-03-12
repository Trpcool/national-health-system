// import request from "./request";

const KEY =
  "pat_POjysQcM60LNJ7JQX4sijrLmGigVTPi96QgmY3y1fuIJ7ngQKlAzcDLNVBLFo2kO";
const BOT_ID = "7480178581915156491";

/**
 * 获取ai对话key
 */
export const getAiKeyAPI = () => {
  return fetch("https://api.coze.cn/v1/conversation/create", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + KEY,
    },
  });
};

/**
 * ai对话
 */
export const talkToAiAPI = (resId, user_id, content) => {
  return fetch(`https://api.coze.cn/v3/chat?conversation_id=${resId}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bot_id: BOT_ID,
      user_id,
      stream: true,
      auto_save_history: true,
      additional_messages: [
        {
          role: "user",
          content,
          content_type: "text",
        },
      ],
    }),
  });
};

export const sendMessage = async (userId, content) => {
  try {
    const {
      data: { id },
    } = await (await getAiKeyAPI()).json();

    return talkToAiAPI(id, userId, content);
  } catch (error) {
    console.log(error);
  }
};
