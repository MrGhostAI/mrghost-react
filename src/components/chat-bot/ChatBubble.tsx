import React, { useState } from "react";
import { Fab, Paper, Typography, IconButton } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CloseIcon from "@mui/icons-material/Close";
import io from "socket.io-client";

//TODO: Add properties to control theme, size, and color
//TODO: Break down code into smaller components
export function ChatBubble() {
  const [isBotInitialized, setBotInitialized] = useState<boolean>(false);

  const initializeChatBot = () => {
    setBotInitialized(true);

    // Connect to chat socket
    const socket = io("/chat");

    socket.on("connect", () => {
      console.log("connected");
    });

    console.log(`Socket ID: ${socket.id}`);
  };
  return (
    <>
      {isBotInitialized ? (
        <Paper
          style={{
            position: "fixed",
            bottom: 10,
            right: 16,
            padding: 16,
            height: 400,
            width: 400,
          }}
        >
          <IconButton
            onClick={() => setBotInitialized(false)}
            style={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Support Chat</Typography>
          <Typography variant="body2">
            This is your support UI content.
          </Typography>
        </Paper>
      ) : (
        <Fab
          color="primary"
          aria-label="add"
          size="small"
          style={{ position: "fixed", bottom: "10px", right: "10px" }}
          onClick={initializeChatBot}
        >
          <ChatBubbleIcon fontSize="small" />
        </Fab>
      )}
    </>
  );
}
