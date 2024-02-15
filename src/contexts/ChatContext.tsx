import React from "react";
import io, { Socket } from "socket.io-client";

interface Sender {
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
interface NewMessage extends Pick<Message, "text"> {
  botId: string;
  chatId: string | null;
  chatUserId: string;
}

interface ChatProviderProps {
  botId: string;
  chatId: string | null;
  chatUserId: string;
  children: React.ReactNode;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  isAiTyping: boolean;
}

export const ChatContext = React.createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isAiTyping: false,
});

const saveChatToLocalStorage = (
  botId: string,
  key: string,
  messages: Message[]
) => {
  localStorage.setItem(`${botId}_${key}`, JSON.stringify(messages));
};

const getChatFromLocalStorage = (botId: string, key: string) => {
  const chat = localStorage.getItem(`${botId}_${key}`);
  return chat ? JSON.parse(chat) : [];
};

const WEB_SOCKET_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/chat"
    : "https://www.happyml.com/chat";

export const ChatProvider = ({
  botId,
  chatId,
  chatUserId,
  children,
}: ChatProviderProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isAiTyping, setAiTyping] = React.useState<boolean>(false);

  // Create a socket connection on component mount
  React.useEffect(() => {
    const _socket = io(WEB_SOCKET_API_URL);

    // If the socket connection is successful, set the socket state
    if (_socket) {
      _socket.on("connect", () => {
        setSocket(_socket);
      });
    }

    // Kill the socket connection on component unmount and reset the socket state
    return () => {
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  // TODO: Load chat history from the server
  // React.useEffect(() => {
  //   socket?.emit("join_chat", {});
  // }, [socket, chatId, botId, chatUserId]);

  const sendMessage = (text: string) => {
    socket?.emit(
      "send_message",
      {
        text,
        botId,
        chatId,
        chatUserId,
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

  socket?.on("receive_message", getMessages);
  socket?.on("typing", ({ chatUser, isTyping }) => {
    console.log("typing", chatUser, isTyping);
    setAiTyping(isTyping ? true : false);

    clearTimeout(100);
    //set interval to false after 2 seconds
    setInterval(() => {
      setAiTyping(false);
    }, 1000);
  });

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isAiTyping }}>
      {children}
    </ChatContext.Provider>
  );
};
