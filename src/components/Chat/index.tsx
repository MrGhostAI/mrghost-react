import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import PulsatingDot from './PulsatingDot';
import styled from 'styled-components';

import ExitIcon from './ExitIcon';
import { ReactComponent as SendIcon } from './Send.svg';
import './Chat.css'

// import PromoteMessage from './PromoteMessage.js';
import { BotProvider, BotContext } from '../../contexts/BotContext';
import {theme} from '../../theme';
import { ChatContext, ChatProvider } from '../../contexts/ChatProvider';
import ChatIcon from './Elements/ChatIcon';
import { getHumanReadableDate } from '../../Utils/Date';
import { areEqual, convertToHTML, getSenderName } from './Utils/ChatUtils';
import {ActionContext} from '../../contexts/ActionContext';

const styles = {
  header: {
    // backgroundImage: `url('${backgroundSrc}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'hsla(0, 0%, 100%, 1)',
    padding: '8px 16px',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // textAlign: 'center',
    color: '#22252A',
    borderTop: '1px hsla(90, 6%, 87%, 1) solid',
  },
  botName: {
    fontWeight: 'bold',
    fontSize: 'larger',
  },
  messageBubble: {
    padding: '10px 20px',
    margin: '0',
    borderRadius: '20px',
    maxWidth: '90%',
    width: 'fit-content',
    wordWrap: 'break-word',
  },
  right: {
    backgroundColor: '#333',
    color: '#fff',
    marginLeft: 'auto',
    order: '2',
    textAlign: 'left',
    marginBottom: '1%',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
  },
  left: {
    backgroundColor: '#FFF',
    color: '#222',
    marginRight: 'auto',
    order: '1',
    textAlign: 'left',
    marginBottom: '1%',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0em',
    // opacity: '.75',
  },
  chatContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    padding: '10px',
  },
  chat: {
    // border: '1px #DDD solid',
    height: '100%',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexGrow: 1,
  },
  messagesContainer: {
    overflowY: 'auto',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px hsla(90, 6%, 87%, 1) solid',
    padding: '0.75rem 0.5rem',
  },
  inputText: {
    marginRight: 1,
    '& .MuiOutlinedInput-root': {
      border: 'none',
    },
    '& .MuiInputLabel-root': {
      display: 'none',
    },
    '&:hover .MuiOutlinedInput-root': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  sendButton: {
    cursor: 'pointer',
    minHeight: '40px',
    minWidth: '40px',
    padding: 0,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};

export function GhostIcon({color1, color2, color3, width='100%'} : {color1: string, color2: string, color3: string, width: string}) {
  return (
    <svg
      id="Layer_1"
      width={width}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
    >
      <g>
        <path
          fill={color3}
          d="m63.17,15.85h23.66v59.15s0,0,0,0v59.15h-23.66c-32.67,0-59.15-26.48-59.15-59.15S30.5,15.85,63.17,15.85Z"
        />
        <path
          fill={color1}
          d="m86.83,15.85h0c32.67,0,59.15,26.48,59.15,59.15v59.15h-59.15c-32.67,0-59.15-26.48-59.15-59.15h0c0-32.67,26.48-59.15,59.15-59.15Z"
        />
      </g>
      <circle fill={color2} cx="67.11" cy="55.28" r="11.83" />
      <circle fill={color2} cx="106.55" cy="55.28" r="11.83" />
    </svg>
  );
}

const ChatIconButton = React.memo(function ChatIconButton({
  isOpen,
  handleOnClick,
  hasUnreadMessages,
  defaultStyles = {},
} : {isOpen: boolean, handleOnClick: () => void, hasUnreadMessages: boolean, defaultStyles: any}){
  const { bot } = useContext(BotContext);
  const { newMessages } = useContext(ChatContext);
  const [imageError, setImageError] = useState(false);

  const styles = { ...defaultStyles, ...(bot?.styles || {}) };

  return (
    <IconButton
      onClick={handleOnClick}
      sx={{
        position: 'absolute',
        bottom: '0.5rem',
        right: '0.5rem',
        transition: 'transform 0.3s ease',
        '&:hover': {
          backgroundColor: 'transparent',
          transform: 'scale(1.08)',
        },
      }}
      disableRipple
    >
      {/* <ExpandMoreIcon
        sx={{
          position: 'absolute',
          bottom: '50%',
          right: '50%',
          transform: 'translate(50%, 50%)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
          color: '#333',
        }}
        fontSize="large"
      /> */}
      <Badge
        overlap="circular"
        badgeContent={<PulsatingDot color={theme.palette.error.main} />}
        invisible={!newMessages}
        sx={{
          filter: isOpen ? 'brightness(120%) contrast(70%)' : 'none' ,
          transition: 'filter 0.3s ease',
        }}
      >
        <ChatIcon bot={bot} styles={styles} />
      </Badge>
    </IconButton>
  );
});

export function MainMessageComponent({
  message,
  myRoles,
  margin = '10px 0',
  chatStyles
} : {message: any, myRoles: string[], margin: string, chatStyles: any}) {
  console.log('Rerender MainMessageComponent', message.text);
  const { bot } = useContext(BotContext);
  console.log('MainMessageComponent bot', bot);
  const isRight = myRoles.includes(message.role || '');
  const senderStyles = isRight ? styles.right : styles.left;
  let senderName = getSenderName(message, bot);
  const leftCorner = { borderRadius: '24px 24px 24px 0px' };
  const rightCorner = { borderRadius: '24px 24px 0px 24px' };
  const bubbleStyle = isRight ? rightCorner : leftCorner;

  useEffect(() => {
    console.log('MainMessageComponent first', message.text);
  }, []);

  if (message.functionCall) {
    // return (
    //   <Box sx={{ margin: margin }}>
    //     <Divider>
    //       <Typography variant="caption" sx={{
    //         color: '#333'
    //       }}>Calling function: {message.functionCall.name}</Typography>
    //     </Divider>
    //   </Box>
    // );
    return null;
  }

  if (message.role === 'function' || message.functionCallResult) {
    // return (
    //   <Box sx={{ margin: margin }}>
    //     <Divider>
    //       <Typography variant="caption" sx={{
    //         color: '#333'
    //       }}>Function result: {message.functionCallResult?.content}</Typography>
    //     </Divider>
    //   </Box>
    // );
    return null;
  }

  return message.role === 'system' ? (
    <Box sx={{ margin: margin }}>
      <Divider>
        <Typography variant="caption" sx={{
          color: '#333'
        }}>{message.text}</Typography>
      </Divider>
    </Box>
  ) : (
    <Box
      sx={{
        width: '100%',
        textAlign: isRight ? 'right' : 'left',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: '.5',
          textAlign: isRight ? 'right' : 'left',
          margin: '0 15px',
          color: '#000000',
        }}
      >
        {senderName}
      </Typography>
      <Box
        sx={{
          ...styles.messageBubble,
          ...senderStyles,
          ...bubbleStyle,
          backgroundColor: isRight
            ? chatStyles?.primaryColor || '#333'
            : chatStyles?.secondaryColor || '#FFFFFF',
          color: isRight ? '#fff' : chatStyles?.fontColor || '#000000',
        }}
      >
        <Typography
          style={{
            fontFamily: chatStyles?.fontType || '',
            color: isRight ? chatStyles?.fontColor : '#000000',
          }}
          className="message-text"
          dangerouslySetInnerHTML={{
            __html: convertToHTML(message.text),
          }}
        />
        <Typography
          variant="caption"
          sx={{
            opacity: '.5',
            display: message.edit ? 'block' : 'none',
            textAlign: 'right',
          }}
        >
          edited
        </Typography>
      </Box>
    </Box>
  );
}

export const Message = React.memo(MainMessageComponent, areEqual);

export function MessageList({
  messages,
  myRoles,
  chatStyles,
  preview,
  MessageComponent,
  blank,
  previewMessages,
} : {messages: any[], myRoles: string[], chatStyles: any, preview: boolean, MessageComponent: any, blank: boolean, previewMessages: any[]}) {
  console.log('Rerender MessageList', messages, preview, blank, previewMessages, blank);
  useEffect(() => {
    console.log('MessageList first');
  }, []);
  if (blank) return null;
  if (preview) {
    return previewMessages?.map((message) => (
      <React.Fragment key={message._id}>
        <MessageComponent
          message={message}
          myRoles={myRoles}
          chatStyles={chatStyles}
        />
      </React.Fragment>
    ));
  }
  return messages?.map((message, index) => {
    // created at is a dateString
    const timeGap =
      index === 0
        ? (new Date().getTime() - new Date(message.createdAt).getTime()) / 1000
        : (new Date(message.createdAt) -
            new Date(messages[index - 1].createdAt)) /
          1000;
    return (
      <React.Fragment key={index !== 0 ? message._id : 0}>
        {timeGap > 900 ||
          (timeGap === -1 && message.createdAt && (
            <Box sx={{ margin: '0.5rem 0', textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#333',
                }}
              >
                {getHumanReadableDate(message.createdAt)}
              </Typography>
            </Box>
          ))}
        <MessageComponent
          message={message}
          myRoles={myRoles}
          chatStyles={chatStyles}
        />
      </React.Fragment>
    );
  });
};

export function Header({
  exitHandler,
  chatStyles,
  refreshChatLocalStorage,
} : {exitHandler: () => void, chatStyles: any, refreshChatLocalStorage: () => void}) {
  let svgUrl = '';
  const { bot } = useContext(BotContext);

  return (
    <Box
      sx={{
        ...styles.header,
        color: chatStyles?.fontColor || '#fff',
        backgroundImage: svgUrl,
        backgroundColor: chatStyles?.primaryColor || '#333',
      }}
    >
      <div style={styles.flexRow}>
        <div>
          <div style={{ ...styles.botName, fontFamily: chatStyles?.fontType }}>
            {bot?.name}
          </div>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={refreshChatLocalStorage}
            sx={{
              color: chatStyles?.fontColor || '#fff',
              marginRight: '-0.5rem',
            }}
          >
            <Tooltip title="Refresh chat" placement="bottom">
              <RefreshIcon />
            </Tooltip>
          </IconButton>
          {exitHandler ? (
            <IconButton
              onClick={exitHandler}
              sx={{
                marginRight: '-0.5rem',
              }}
            >
              <ExitIcon color={chatStyles?.fontColor || '#fff'} />
            </IconButton>
          ) : null}
        </Box>
      </div>
    </Box>
  );
}

const StyledLink = styled.a`
  text-decoration: none;
  transition: color 0.3s;
  color: #333; // Adjust according to your theme

  &:hover {
    color: #444; // Adjust according to your theme
    cursor: pointer;
  }
`;

export function Footer({chatStyles} : {chatStyles: any}) {
  return (
    <div style={{ ...styles.footer, backgroundColor: chatStyles.backgroundColor }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginRight: '.5ch', opacity: '.8' }}
      >
        Powered by
      </Typography>
      <StyledLink
        target='_blank'
        href='https://mrghost.ai'
      >
        Mr. Ghost
      </StyledLink>
    </div>
  );
}

export function InputBar({ sendMessage, chatStyles, preview } : {sendMessage: (text: string, callback?: () => void) => void, chatStyles: any, preview: boolean}) {
  const [text, setText] = useState('');
  const {userIsTyping} = useContext(ChatContext);
  const onSubmit = (event : any) => {
        event.preventDefault();
        sendMessage(text, () => {
          setText('');
        });
      }
  return (
    <Box
      sx={{
        ...styles.inputContainer,
        backgroundColor: chatStyles?.backgroundColor || '#fff',
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <TextField
        type="text"
        value={text}
        placeholder="Type your message here"
        size="small"
        name="message"
        fullWidth
        autoComplete="off"
        sx={{
          ...styles.inputText,
          fontFamily: `${chatStyles?.fontType || ''} !important`,
          '& input::placeholder': {
            fontFamily: `${chatStyles?.fontType || ''} !important`,
          },
          input: {
            color: '#000',
            background: chatStyles?.backgroundColor || '#fff',
          },
        }}
        onChange={(e) => {
          setText(e.target.value);
          userIsTyping();
        }}
        disabled={preview}
      />
      <Button
        variant="text"
        onClick={onSubmit}
        sx={styles.sendButton}
        disabled={preview}
      >
        <svg width="25" height="26" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_174_2959)">
          <path d="M1.20893 6.04069C0.929857 6.12043 0.676444 6.27166 0.473762 6.4794C0.27108 6.68715 0.126155 6.94422 0.0533278 7.22517C-0.0194996 7.50612 -0.0177053 7.80123 0.0585331 8.08127C0.134772 8.36132 0.282812 8.61661 0.488005 8.82187L3.33169 11.6622V17.1512H8.82655L11.6894 20.0099C11.8431 20.1649 12.0258 20.288 12.2272 20.3721C12.4286 20.4562 12.6446 20.4997 12.8629 20.5C13.0063 20.4997 13.1492 20.4812 13.2879 20.445C13.5688 20.3743 13.826 20.2308 14.0338 20.029C14.2415 19.8273 14.3925 19.5743 14.4714 19.2957L20.0004 0.5L1.20893 6.04069ZM1.67232 7.64339L15.8641 3.45954L5.00024 14.3059V10.9721L1.67232 7.64339ZM12.8737 18.8315L9.51747 15.4844H6.18372L17.0459 4.63135L12.8737 18.8315Z" fill="#22252A"/>
          </g>
          <defs>
          <clipPath id="clip0_174_2959">
            <rect width="25" height="26" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
          </defs>
        </svg>
      </Button>
    </Box>
  );
}

export function ChatClient({
  disableHeader = false,
  disableFooter = false,
  exitHandler = null,
  chatStyles = {},
  preview = false,
  messageComponent: MessageComponent = Message,
  blank = false,
}) {
  const { bot } = useContext(BotContext);
  // const context = useContext(ChatContext);
  // console.log('ChatClient context', context);
  const {
    messages,
    sendMessage,
    isTypingUser,
    isAdmin,
    chatId,
    refreshChatLocalStorage,
  } = useContext(ChatContext);
  useEffect(() => {
    console.log('ChatClient messages', messages);
  }, [messages]);
  // const messages = null;
  // const sendMessage = null;
  // const isTypingUser = null;
  // const isAdmin = null;
  // const chatId = null;
  // const refreshChatLocalStorage = null;
  const messagesEndRef = useRef(null);
  const parentRef = useRef(null);
  const [hasInitialScroll, setHasInitialScroll] = useState(false);

  const myRoles = isAdmin ? ['admin', 'ai'] : ['user'];

  chatStyles = {
    ...theme.components.DefaultChatStyles,
    ...chatStyles,
  };

  console.log('loading chat');

  const previewMessages = [
    {
      _id: '651dd33426baa65d68abb5d8',
      sender: {
        _id: '6508b5a15aaf933629749fa3',
        name: bot?.name,
      },
      role: 'ai',
      text: bot?.settings?.startMessage,
    },
    {
      _id: '651dd33526baa65d68abb5da',
      chat: '651dd33426baa65d68abb5d6',
      sender: {
        _id: '650374d85aaf93362974982e',
        name: 'User',
      },
      role: 'user',
      text: 'What can I do on this platform?',
    },
  ];

  useEffect(
    (a) => {
      console.log(
        `ChatClient changed: chatId ${chatId}, messages ${messages?.length}, isTyping ${isTypingUser}, isAdmin: ${isAdmin}, blank: ${blank}`
      );
    },
    [
      messages.length,
      isTypingUser,
      isAdmin,
      chatId,
      blank,
    ]
  );

  // useEffect(() => {
  //   const chatContainer = document.querySelector('.chat-container'); // Adjust the selector to your chat container
  //   if (!chatContainer) return;

  //   const observer = new MutationObserver(() => {
  //     chatContainer.scrollTop = chatContainer.scrollHeight;
  //   });

  //   observer.observe(chatContainer, { childList: true });

  //   return () => observer.disconnect();
  // }, []);

  const scrollToBottom = () => {
    console.log('messages changed');
    if (!messages || preview || blank || messages.length === 0) return;
    const behavior = 'instant' // hasInitialScroll ? 'smooth' : 'instant';
    console.log('scrolling...', behavior);
    setTimeout(() => {
      const messagesEnd = messagesEndRef.current;
      const parent = parentRef.current;

      if (messagesEnd && parent) {
        const topPosition = messagesEnd.offsetTop;
        if (behavior === 'smooth') {
          parent.scrollTo({ top: topPosition, behavior: 'smooth' });
        } else {
          parent.scrollTop = topPosition;
        }
      }
    }, 0); // This timeout ensures the code executes after the DOM has fully loaded
    if (!hasInitialScroll) {
      setHasInitialScroll(true);
    }
  };
  useEffect(scrollToBottom, [messages, preview, blank]);

  useEffect(() => {
    console.log('chat id changed');
    setHasInitialScroll(false);
  }, [chatId]);

  useEffect(() => {
    console.log('typing changed', isTypingUser);
  }, [isTypingUser]);

  return (
    <Box sx={styles.chat}>
      {disableHeader ? null : (
        <Header
          exitHandler={exitHandler}
          chatStyles={chatStyles}
          refreshChatLocalStorage={refreshChatLocalStorage}
        />
      )}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'hidden',
          backgroundColor: chatStyles?.backgroundColor || 'none',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
            padding: '10px 10px 0px',
          }}
          ref={parentRef}
        >
          <MessageList messages={messages} myRoles={myRoles} chatStyles={chatStyles} preview={preview} MessageComponent={MessageComponent} blank={blank} previewMessages={previewMessages} />
          <div ref={messagesEndRef} />
        </Box>
        <Typography
          variant="caption"
          color="#000"
          sx={{
            opacity: '.5',
            // margin: '0.25rem',
            visibility: isTypingUser ? 'visible' : 'hidden',
            position: 'absolute',
            bottom: '0.5rem',
            left: '1rem',
            backgroundColor: 'transparent',
          }}
        >
          {isTypingUser} is typing...
        </Typography>
      </Box>
      <InputBar
        sendMessage={sendMessage}
        chatStyles={chatStyles}
        preview={preview}
      />
      {disableFooter ? null : <Footer chatStyles={chatStyles} />}
    </Box>
  );
}

export function ChatApp({
  botId,
  chatId = null,
  userId = null,
  visible = true,
} : {botId: string, chatId?: string | null, userId?: string | null, visible?: boolean}) {
  const { bot } = useContext(BotContext);
  const { functions } = useContext(ActionContext);
  return (
    <div style={{ display: visible ? 'block' : 'none', height: '100%', width: '100%' }}>
      <BotProvider botId={botId}>
        <ChatProvider
          botId={botId}
          chatId={chatId}
          botUserId={userId}
          preview={false}
          additionalFunctions={functions}
        >
          <ChatClient
            chatStyles={bot?.styles || {}}
            exitHandler={null}
            preview={false}
            messageComponent={Message}
            blank={false}
          />
        </ChatProvider>
      </BotProvider>
    </div>
  );
}

function EmbedChat({shadow=false}) {
  // const {bot} = useContext(BotContext);
  // const {chat} = useContext(ChatContext);
  const { bot } = useContext(BotContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPromoteOpen, setIsPromoteOpen] = useState(true);

  function requestResize(width : string, height : string) {
    window.parent.postMessage(
      {
        type: 'resizeIframe',
        width: width,
        height: height,
      },
      '*'
    );
  }

  const handleOnClick = () => {
    console.log('clicked', isChatOpen);
    if (!isChatOpen) {
      requestResize('50rem', '95%');
    } else {
      requestResize('88px', '88px');
    }
    setIsChatOpen(!isChatOpen);
  };

  function handleOnClose() {
    console.log('closed');
    requestResize('88px', '88px');
    setIsChatOpen(false);
    setIsPromoteOpen(false);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100svh',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <ChatIconButton
        isOpen={isChatOpen}
        handleOnClick={handleOnClick}
        hasUnreadMessages={true}
        defaultStyles={theme.components.DefaultChatStyles}
      />
      {isChatOpen && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '6rem',
            right: '1rem',
            width: 'calc(100% - 2rem)',
            height: 'calc(100% - 7rem)',
            // border: '1px #DDD solid',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: shadow ? '0 0 0.75rem 0 rgba(0,0,0,0.2)' : 'none',
          }}
        >
          <BotProvider botId={bot._id}>
            <ChatProvider botId={bot._id} preview={false}>
              <ChatApp
                exitHandler={handleOnClick}
                preview={false}
                disableFooter={true}
                chatStyles={{
                  chat: {
                    borderRadius: '1rem',
                    border: 'none',
                  },
                }}
              />
            </ChatProvider>
          </BotProvider>
        </Box>
      )}
      {/* {bot?.styles?.showPromoteMessage && (
        <Box sx={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
          <PromoteMessage
            open={isPromoteOpen}
            setOpen={handleOnClose}
            setIsChatOpen={handleOnClick}
          />
        </Box>
      )} */}
    </Box>
  );
};
