import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatInputBar from "./ChatInputBar";
import ChatMessage from "./ChatMessage";
interface ChatPanelProps {
  close: () => void;
}

export default function ChatPanel({ close }: ChatPanelProps) {
  return (
    <Paper
      style={{
        position: "fixed",
        bottom: 10,
        right: 16,
        height: 600,
        width: 400,
      }}
    >
      <IconButton
        onClick={close}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <main>
        <div style={{ padding: 10 }}>
          <Typography variant="h6" mb={2}>
            happyml
          </Typography>

          <ChatMessage
            message={{
              text: "Hey, how can I help you?",
              role: "system",
            }}
            senderName="Gilbert Y."
            isRight={false}
          />
          <ChatMessage
            message={{
              text: "How can I file my taxes?",
              role: "user",
            }}
            senderName="Gilbert Y."
            isRight={true}
          />
        </div>

        <ChatInputBar />
      </main>
    </Paper>
  );
}
