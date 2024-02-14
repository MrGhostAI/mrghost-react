import React from "react";
import { Paper, IconButton, Box, Typography } from "@mui/material";
import { ChatContext, ActionContext } from "../../contexts";
import CloseIcon from "@mui/icons-material/Close";
import ChatInputBar from "./ChatInputBar";
import ChatMessage from "./ChatMessage";

interface ChatPanelProps {
  close: () => void;
}

export default function ChatPanel({ close }: ChatPanelProps) {
  const { messages, isAiTyping } = React.useContext(ChatContext);
  const { registerFunction, functions } = React.useContext(ActionContext);

  const closeChat = () => {
    console.log("Closing chat panel...");
  };
  React.useEffect(() => {
    registerFunction({
      name: "closeChat",
      description: "Close the chat panel",
      parameters: {},
      fn: closeChat,
    });
  }, []);

  console.log(`functions: ${JSON.stringify(functions, null, 2)}`);

  return (
    <Paper
      style={{
        position: "fixed",
        bottom: 10,
        right: 16,
        height: 600,
        width: 400,
        // overflowY: "auto",
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
        <ChatInputBar />
      </Box>
    </Paper>
  );
}
