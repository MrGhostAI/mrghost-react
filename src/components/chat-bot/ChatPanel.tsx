import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatInputBar from "./ChatInputBar";
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
          <Typography variant="h6">happyml</Typography>
        </div>

        <ChatInputBar />
      </main>
    </Paper>
  );
}
