import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { ChatContext } from "../../contexts";
import SendIcon from "@mui/icons-material/Send";

export default function ChatInputBar() {
  const [text, setText] = useState("");
  const { sendMessage } = useContext(ChatContext);

  // Form submission handler
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = text.trim();

    sendMessage(trimmedText); // Send the message to the server
    setText(""); // Clear the input field after submitting the message
  };

  // Handle 'Enter' key press
  const onEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // handle guard
    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      sendMessage(trimmedText); // Send the message to the server
      setText(""); // Clear the input field after submitting the message
    }
  };

  return (
    <Box
      sx={{
        ...styles.inputContainer,
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        type="text"
        value={text}
        placeholder="Type your message here"
        size="medium"
        name="message"
        multiline={true}
        fullWidth
        autoComplete="off"
        sx={{
          ...styles.inputText,
          input: {
            color: "#000",
          },
        }}
        onKeyDown={onEnterKeyPress}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="text"
        sx={styles.sendButton}
        type="submit"
        disabled={!text}
      >
        <SendIcon />
      </Button>
    </Box>
  );
}

const styles = {
  sendButton: {
    cursor: "pointer",
    minHeight: "40px",
    minWidth: "40px",
    padding: 0,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
    rotate: "-45deg",
  },
  inputContainer: {
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px hsla(90, 6%, 87%, 1) solid",
    position: "fixed",
    bottom: 12,
    width: 400,
  },

  inputText: {
    marginRight: 1,
    "& .MuiOutlinedInput-root": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      display: "none",
    },
    "&:hover .MuiOutlinedInput-root": {
      border: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
};
