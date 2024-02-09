import React from "react";
import {
  Fab,
  Paper,
  Typography,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
        padding: 16,
        height: 400,
        width: 400,
      }}
    >
      <IconButton
        onClick={close}
        style={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6">Support Chat</Typography>
      <Typography variant="body2">This is your support UI content.</Typography>
    </Paper>
  );
}
