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
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Paper sx={styles.chatPanel}>
      <Box sx={styles.chatHeader} bgcolor="primary.main">
        <IconButton onClick={close} size="small" sx={styles.closeIcon}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box mb={10}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isAiTyping ? (
          <Typography variant="caption" sx={styles.placeholder}>
            Customer Support is typing...
          </Typography>
        ) : null}
        <div ref={messagesEndRef} />

        <ChatInputBar />
      </Box>
    </Paper>
  );
}

const styles = {
  chatPanel: {
    position: "fixed",
    bottom: 10,
    right: 16,
    height: 600,
    width: 400,
    overflowY: "auto",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 3,
    borderBottom: "1px solid #ccc",
  },
  closeIcon: {
    color: "#fff",
    position: "fixed",
    right: 25,
  },
  placeholder: {
    opacity: ".5",
    margin: "0 15px",
    color: "#000000",
    textAlign: "right",
  },
};
