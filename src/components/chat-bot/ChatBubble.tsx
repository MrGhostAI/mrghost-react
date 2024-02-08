import React from "react";
import { Fab } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

//TODO: Add properties to control theme, size, and color
export function ChatBubble() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      size="small"
      style={{ position: "fixed", bottom: "10px", right: "10px" }}
    >
      <ChatBubbleIcon fontSize="small" />
    </Fab>
  );
}
