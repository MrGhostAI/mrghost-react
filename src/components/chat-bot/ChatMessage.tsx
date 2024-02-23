import React from "react";
import { Box, Typography } from "@mui/material";
import { Message } from "../../contexts";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const leftCorner = { borderRadius: "24px 24px 24px 0px" };
  const rightCorner = { borderRadius: "24px 24px 0px 24px" };
  const bubbleStyle = isUser ? rightCorner : leftCorner;
  const backgroundColor = message.role === "ai" ? "#f5f5f5" : "primary.main";
  const color = message.role === "ai" ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        padding: 2,
        marginLeft: isUser ? "auto" : "0", // Align entire box to the right if user
        textAlign: isUser ? "right" : "left", // Align sender's name and message within the box
      }}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: ".5",
          color: "#000000",
        }}
      >
        {message?.sender?.name}
      </Typography>

      <Box
        sx={{
          ...styles.messageBubble,
          ...bubbleStyle,
          backgroundColor,
          marginLeft: isUser ? "auto" : "0", // Align entire box to the right if user
        }}
      >
        <Typography
          sx={{
            color,
            overflow: "hidden",
          }}
        >
          {message.text}
        </Typography>
      </Box>
    </Box>
  );
}

const styles = {
  messageBubble: {
    padding: "10px 20px",
    borderRadius: "20px",
    maxWidth: "90%",
    width: "fit-content",
    wordWrap: "break-word",
  },
};
