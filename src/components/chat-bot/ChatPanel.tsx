import React from "react";
import { Paper, IconButton, Box } from "@mui/material";
import { ChatContext } from "../../contexts";
import CloseIcon from "@mui/icons-material/Close";
import ChatInputBar from "./ChatInputBar";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  close: () => void;
}

export default function ChatPanel({ close }: ChatPanelProps) {
  const { messages } = React.useContext(ChatContext);

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

      <Box mt={4}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        <ChatInputBar />
      </Box>
    </Paper>
  );
}
