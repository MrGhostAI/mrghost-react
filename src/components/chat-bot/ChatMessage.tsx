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
  const backgroundColor =
    message.role === "system" ? "#f5f5f5" : "primary.main";
  const color = message.role === "system" ? "#000000" : "#ffffff";
  return (
    <Box sx={{ textAlign: isRight ? "right" : "left" }}>
      <Typography
        variant="caption"
        sx={{
          opacity: ".5",
          margin: "0 15px",
          color: "#000000",
        }}
      >
        {message.role === "system" ? "System" : message.sender.name}
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
