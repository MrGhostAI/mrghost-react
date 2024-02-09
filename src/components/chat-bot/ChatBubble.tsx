import React from "react";
import { Fab } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

interface ChatBubbleProps {
  initializeChatBot: () => void;
}

export default function ChatBubble({ initializeChatBot }: ChatBubbleProps) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      size="small"
      style={{ position: "fixed", bottom: "10px", right: "10px" }}
      onClick={initializeChatBot}
    >
      <ChatBubbleIcon fontSize="small" />
    </Fab>
  );
}
