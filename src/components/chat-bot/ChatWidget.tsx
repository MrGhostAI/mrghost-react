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
      botId=""
      chatId=""
      chatUserId=""
      isAdmin={false}
      preview={false}
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
