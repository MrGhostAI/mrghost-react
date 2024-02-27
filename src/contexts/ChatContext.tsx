import React from "react";
import io, { Socket } from "socket.io-client";
import { ActionContext, ActionResponse } from "./ActionContext";

interface SavedChatMessage {
  chatId: string;
  chatUserId: string;
  messages: Message[];
}

export interface Sender {
  _id: string;
  name: string;
}

export interface Message {
  _id: string;
  chat: string;
  sender: Sender;
  role: "system" | "user" | "ai";
  text: string;
  sources: string[];
  payer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatProviderProps {
  botId: string;
  chatId: string | null;
  chatUserId: string;
  children: React.ReactNode;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  isAiTyping: boolean;
}

export const ChatContext = React.createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isAiTyping: false,
});

const saveChatToLocalStorage = (botId: string, key: string, data: string) => {
  localStorage.setItem(`${botId}_${key}`, data);
};

const getChatFromLocalStorage = (botId: string, key: string) => {
  return localStorage.getItem(`${botId}_${key}`);
};

const WEB_SOCKET_API_URL = "http://localhost:3000/chat";
// const WEB_SOCKET_API_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000/chat"
//     : "https://www.happyml.com/chat";

export const ChatProvider = ({
  botId,
  chatId,
  chatUserId,
  children,
}: ChatProviderProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isAiTyping, setAiTyping] = React.useState<boolean>(false);
  const { functions } = React.useContext(ActionContext);

  // Create a socket connection on component mount
  React.useEffect(() => {
    const _socket = io(WEB_SOCKET_API_URL);

    // If the socket connection is successful, set the socket state
    if (_socket) {
      _socket.on("connect", () => {
        setSocket(_socket);
      });

      _socket?.on("receive_message", getMessages);

      _socket?.on("error", (error) => {
        // TODO: replace with toast notif
        alert(JSON.stringify(error, null, 2));
      });
      _socket?.on("typing", ({ isTyping }) => {
        setAiTyping(isTyping ? true : false);

        clearTimeout(100);
        //set interval to false after 2 seconds
        setInterval(() => {
          setAiTyping(false);
        }, 1000);
      });

      _socket?.on("receive_message_fragment", (message: Message) => {
        setMessages((prevMessages) => {
          let index = prevMessages.findIndex((prevMessage) => {
            return message._id === prevMessage._id;
          });
          let newMessages: Message[] = [];
          if (index === -1) {
            // create new message
            newMessages = [...prevMessages, message];
          } else {
            // update message
            newMessages = [...prevMessages];
            newMessages[index].text += message.text;
          }
          return newMessages;
        });
      });
    }

    // Kill the socket connection on component unmount and reset the socket state
    return () => {
      _socket.off("connect");
      _socket.off("receive_message");
      _socket.off("error");
      _socket.off("typing");
      _socket.off("receive_message_fragment");
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  // Load chat history from the server
  React.useEffect(() => {
    socket?.emit(
      "join_chat",
      {
        incomingBotId: botId,
        incomingChatId: chatId,
        incomingChatUserId: chatUserId,
      },
      (data: SavedChatMessage) => {
        setMessages(data.messages);
        saveChatToLocalStorage(botId, "chatUserId", data.chatUserId || "");
        saveChatToLocalStorage(botId, "chatId", data.chatId || "");
      }
    );
  }, [socket, chatId, botId, chatUserId]);

  React.useEffect(() => {
    socket?.on("call_action", (response: ActionResponse, callback) => {
      const { action, params } = response;
      const selectedFunction = functions.find((fn) => fn.name === action);

      if (!selectedFunction) {
        console.error(`No action found with the name: ${action}`);
        return;
      }

      const { fn } = selectedFunction;
      const result = fn(params?.name);

      callback(result);
    });

    // Clean up the event listener
    return () => {
      socket?.off("call_action");
    };
  }, [socket, functions]);

  const sendMessage = (text: string) => {
    const savedChatUserId = getChatFromLocalStorage(botId, "chatUserId");
    const savedChatId = getChatFromLocalStorage(botId, "chatId");

    socket?.emit(
      "send_message",
      {
        text,
        botId,
        chatId: savedChatId ?? chatId,
        chatUserId: savedChatUserId ?? chatUserId,
        additionalFunctions: functions,
      },

      (message: Message) =>
        // Add new message to the state
        setMessages((prevMessages) => [...prevMessages, message])
    );
  };

  const getMessages = (message: Message) => {
    setMessages((prevMessages) => {
      // Check if the message is already in the list
      // Assume that each message has a unique id property
      if (
        prevMessages.some((prevMessage) => {
          return message._id === prevMessage._id;
        })
      ) {
        // If the message is already in the list, return the list unmodified
        return prevMessages;
      } else {
        // If the message is not in the list, add it
        return [...prevMessages, message];
      }
    });
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isAiTyping }}>
      {children}
    </ChatContext.Provider>
  );
};
