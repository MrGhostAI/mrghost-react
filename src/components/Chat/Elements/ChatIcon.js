import React, { useState } from "react";
import DefaultChatIcon from "./DefaultChatIcon";
import Box from "@mui/material/Box";

function ChatIcon({ bot, styles }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '56px',
        width: '56px',
      }}
    >
      <Box>
          <Box
            sx={{
              zIndex: 1,
              position: 'absolute',
            }}
          >
            <DefaultChatIcon
              color1={styles.secondaryColor}
              color2={styles.primaryColor}
              color3={styles.fontColor}
              width="56px"
            />
          </Box>
          <Box
            sx={{
              borderRadius: '50%',
              boxShadow: '0px 0px 0.35rem 0.35rem rgba(0, 0, 0, 0.3)',
              height: '70%',
              width: '70%',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }}
          ></Box>
      </Box>
    </Box>
  );
}

export default ChatIcon;