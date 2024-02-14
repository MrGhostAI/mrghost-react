import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { type Message } from "../../contexts";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isRight = message.role === "user";
  const leftCorner = { borderRadius: "24px 24px 24px 0px" };
  const rightCorner = { borderRadius: "24px 24px 0px 24px" };
  const bubbleStyle = isRight ? rightCorner : leftCorner;
  const backgroundColor = message.role === "ai" ? "#f5f5f5" : "primary.main";
  const color = message.role === "ai" ? "#000000" : "#ffffff";

  console.log(`Message in Chat: ${JSON.stringify(message, null, 2)}`);

  return (
    <Box sx={{ textAlign: isRight ? "right" : "left", padding: 2 }}>
      <Typography
        variant="caption"
        sx={{
          opacity: ".5",
          margin: "0 15px",
          color: "#000000",
        }}
      >
        {message.role === "system" ? "System" : message?.sender?.name}
      </Typography>
      <Box
        sx={{
          ...styles.messageBubble,
          ...bubbleStyle,
          backgroundColor,
          marginLeft: isRight ? "auto" : "0",
        }}
      >
        <Divider>
          <Typography
            sx={{
              color,
            }}
          >
            {message.text}
          </Typography>
        </Divider>
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
