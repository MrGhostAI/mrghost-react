import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { HappyMLTheme } from "../../theme";
import { ChatProvider } from "../../contexts";
import ChatPanel from "./ChatPanel";
import ChatBubble from "./ChatBubble";

export function ChatWidget() {
  const [isBotInitialized, setBotInitialized] = useState<boolean>(false);

  return (
    <ChatProvider
      botId="65b80bd8e0c7a0bb5501ca56"
      chatUserId="65b807e2e0c7a0bb5501ca36"
      chatId={null}
    >
      <ThemeProvider theme={HappyMLTheme}>
        <CssBaseline />
        {isBotInitialized ? (
          <ChatPanel close={() => setBotInitialized(false)} />
        ) : (
          <ChatBubble initializeChatBot={() => setBotInitialized(true)} />
        )}
      </ThemeProvider>
    </ChatProvider>
  );
}
