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
}

export const ChatContext = React.createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
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

export const ChatProvider = ({
  botId,
  chatId,
  chatUserId,
  children,
}: ChatProviderProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [socket, setSocket] = React.useState<Socket | null>(null);

  // Create a socket connection on component mount
  React.useEffect(() => {
    const _socket = io("http://localhost:3000/chat");

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

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
