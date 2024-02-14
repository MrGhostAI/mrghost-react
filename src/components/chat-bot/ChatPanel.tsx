import React from "react";
import { Paper, IconButton, Box, Typography } from "@mui/material";
import { ChatContext } from "../../contexts";
import CloseIcon from "@mui/icons-material/Close";
import ChatInputBar from "./ChatInputBar";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  close: () => void;
}

export default function ChatPanel({ close }: ChatPanelProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { messages, isAiTyping } = React.useContext(ChatContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom of the chat panel when new messages are added
  React.useEffect(scrollToBottom, [messages]);

  return (
    <Paper
      style={{
        position: "fixed",
        bottom: 10,
        right: 16,
        height: 600,
        width: 400,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          position: "sticky",
          marginTop: 1,
          marginRight: 1,
        }}
      >
        <IconButton
          onClick={close}
          size="small"
          sx={{ backgroundColor: "ButtonShadow" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box mb={10}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isAiTyping ? (
          <Typography
            variant="caption"
            sx={{
              opacity: ".5",
              margin: "0 15px",
              color: "#000000",
              textAlign: "right",
            }}
          >
            Customer Support is typing...
          </Typography>
        ) : null}
        <div ref={messagesEndRef} />

        <ChatInputBar />
      </Box>
    </Paper>
  );
}
