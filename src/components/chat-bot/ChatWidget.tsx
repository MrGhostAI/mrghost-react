import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { HappyMLTheme } from "../../theme";
import io from "socket.io-client";
import ChatPanel from "./ChatPanel";
import ChatBubble from "./ChatBubble";

const BASE_API_URL = "https://www.happyml.com";

export function ChatWidget() {
  const [isBotInitialized, setBotInitialized] = useState<boolean>(false);

  const initializeChatBot = () => {
    setBotInitialized(true);
    const socket = io("http://localhost:3000/chat");

    console.log(`Socket ${socket}`);
  };
  return (
    <ThemeProvider theme={HappyMLTheme}>
      <CssBaseline />
      {isBotInitialized ? (
        <ChatPanel close={() => setBotInitialized(false)} />
      ) : (
        <ChatBubble initializeChatBot={initializeChatBot} />
      )}
    </ThemeProvider>
  );
}
