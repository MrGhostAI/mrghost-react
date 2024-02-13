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
  role: "system" | "user" | "bot";
  text: string;
  sources: string[]; // TODO: Confirm w/ Evan what sources are
  payer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatProviderProps {
  botId: string;
  isAdmin: boolean;
  chatId: string;
  chatUserId: string;
  preview: boolean;
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
    socket?.emit("send_message", {
      text,
      botId,
      chatId,
      chatUserId,
    });

    // TODO: Remove hard coded values
    const newMessage: Message = {
      _id: Date.now().toString(),
      chat: "string",
      text,
      role: "user",
      sources: [],
      payer: "string",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      sender: {
        _id: Date.now().toString(),
        name: "Gilbert Young",
      },
    };
    // Add the new message to the messages state
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
