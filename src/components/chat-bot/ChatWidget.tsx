import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../../theme";
import { ChatProvider } from "../../contexts";
import ChatPanel from "./ChatPanel";
import ChatBubble from "./ChatBubble";

export interface ChatWidgetProps {
  /**
   * The bot id to use for the chat.
   */
  botId: string;
  /**
   * The user id to use for the chat.
   */
  chatUserId: string;
}

/**
 * A widget that can be used to add a chat bot to a website.
 * @param botId The bot id to use for the chat.
 * @param chatUserId The user id to use for the chat.
 */
export function ChatWidget({ botId, chatUserId }: ChatWidgetProps) {
  const [isBotInitialized, setBotInitialized] = useState<boolean>(false);

  return (
    <ChatProvider botId={botId} chatUserId={chatUserId} chatId={null}>
      <ThemeProvider theme={theme}>
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
