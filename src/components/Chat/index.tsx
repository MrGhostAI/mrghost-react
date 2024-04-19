import React, { useState, useLayoutEffect, useContext, useEffect, useRef } from 'react';
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
import DefaultChatIcon from './Elements/DefaultChatIcon';
import ExitIcon from './ExitIcon';
import './Chat.css'

// import PromoteMessage from './PromoteMessage.js';
import { BotProvider, BotContext } from '../../contexts/BotContext';
import {theme, defaultChatStyles} from '../../theme';
import { ChatContext, ChatProvider } from '../../contexts/ChatProvider';
import ChatIcon from './Elements/ChatIcon';
import { getHumanReadableDate } from '../../Utils/Date';
import { areEqual, convertToHTML } from './Utils/ChatUtils';
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
    padding: '0.25rem 0',
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
    maxWidth: '80%',
    width: 'fit-content',
    wordWrap: 'break-word',
    // marginBottom: '1rem',
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
    padding: '0.5rem 0.5rem',
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
    margin: '0 0.5rem 0 0',
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
  icon,
  handleOnClick,
  defaultStyles = {},
} : {icon: any, handleOnClick: () => void, defaultStyles: any}){
  const { bot } = useContext(BotContext);
  const {hasUnreadMessages} = useContext(ChatContext);

  if (!bot) return null;

  console.log('ChatIconButton', bot);
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
      <Badge
        overlap="circular"
        badgeContent={<PulsatingDot color={theme.palette.error.main} />}
        invisible={!hasUnreadMessages}
        sx={{
          // filter: isOpen ? 'brightness(120%) contrast(70%)' : 'none' ,
          transition: 'filter 0.3s ease',
        }}
      >
        {
          icon ? icon : <ChatIcon styles={styles} />
        }
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
        marginBottom: '1rem',
      }}
    >
      {/* <Typography
        variant="caption"
        sx={{
          opacity: '.5',
          textAlign: isRight ? 'right' : 'left',
          margin: '0 15px',
          color: '#000000',
        }}
      >
        {senderName}
      </Typography> */}
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

export const DefaultMessage = React.memo(MainMessageComponent, areEqual);

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
    return (
      <>
      {
        previewMessages?.map((message) => (
          <React.Fragment key={message._id}>
            <MessageComponent
              message={message}
              myRoles={myRoles}
              chatStyles={chatStyles}
            />
          </React.Fragment>
        ))
      }
      </>
    );
  }
  return (
    <>
      {messages?.map((message, index) => {
        // Calculate the time gap in seconds
        const currentTime = new Date().getTime();
        const messageTime = new Date(message.createdAt).getTime();
        const previousMessageTime = index > 0 ? new Date(messages[index - 1].createdAt).getTime() : null;
  
        const timeGap = !previousMessageTime
          ? (currentTime - messageTime) / 1000
          : (messageTime - previousMessageTime) / 1000;
  
        return (
          <React.Fragment key={message._id}>
            {(timeGap > 900 || index === 0) && message.createdAt && (
              <Box sx={{ margin: '0.5rem 0', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: '#333' }}>
                  {getHumanReadableDate(message.createdAt)}
                </Typography>
              </Box>
            )}
            <MessageComponent
              message={message}
              myRoles={myRoles}
              chatStyles={chatStyles}
            />
          </React.Fragment>
        );
      })}
    </>
  );
  
};

export function Header({
  exitHandler,
  chatStyles,
  refreshChatLocalStorage,
} : {exitHandler: Function | null, chatStyles: any, refreshChatLocalStorage: Function}) {
  let svgUrl = '';
  const { bot } = useContext(BotContext);

  const onClick = () => {
    refreshChatLocalStorage();
  }

  const onExit = () => {
    if (exitHandler) {
      exitHandler();
    }
  }

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
            onClick={onClick}
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
              onClick={onExit}
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
    color: #666; // Adjust according to your theme
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
        inputRef={input => input && input.focus()}
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
        <svg width="25px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
  messageComponent: MessageComponent = DefaultMessage,
  blank = false,
} : {disableHeader?: boolean, disableFooter?: boolean, exitHandler?: Function | null, chatStyles?: any, preview?: boolean, messageComponent?: any, blank?: boolean}) {
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
  const [messagesCount, setMessagesCount] = useState(0);
  const myRoles = isAdmin ? ['admin', 'ai'] : ['user'];

  chatStyles = {
    ...(defaultChatStyles || {}),
    ...chatStyles,
    ...(bot?.styles || {}),
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

  useEffect(() => {
    console.log('messages changed', messages.length);
    setMessagesCount(messages.length)
  }, [messages]);

  const scrollToBottom = () => {
    if (!messages || preview || blank || messages.length === 0) return;
    const behavior = hasInitialScroll ? 'smooth' : 'instant';
    console.log('scrolling...', behavior);
    setTimeout(() => {
      const messagesEnd: any = messagesEndRef.current;
      const parent: any
       = parentRef.current;

      if (messagesEnd && parent) {
        const topPosition = messagesEnd.offsetTop;
        if (behavior === 'smooth') {
          console.log('scrolling to bottom smooth');
          parent.scrollTo({ top: topPosition, behavior: 'smooth' });
        } else {
          console.log('scrolling to bottom instant');
          parent.scrollTop = topPosition;
        }
      }
    }, 0); // This timeout ensures the code executes after the DOM has fully loaded
    if (!hasInitialScroll) {
      console.log('setting initial scroll');
      setHasInitialScroll(true);
    }
  };
  useLayoutEffect(scrollToBottom, [messagesCount, preview, blank]);

  const [hasShadow, setHasShadow] = useState(false);

  // Function to handle scroll events
  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop; // Get how far it's been scrolled
    setHasShadow(scrollTop > 0); // Set shadow state based on scroll position
  };

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
        <Box sx={{ boxShadow: hasShadow ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'box-shadow 0.3s ease-in-out' }}>
          <Header
            exitHandler={exitHandler}
            chatStyles={chatStyles}
            refreshChatLocalStorage={refreshChatLocalStorage}
          />
        </Box>
      )}
      <Box sx={{
        flexGrow: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box
          sx={{
            height: '100%',
            backgroundColor: chatStyles?.backgroundColor || 'none',
            overflowY: 'auto',
          }}
          ref={parentRef}
          onScroll={handleScroll}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem 1rem 1rem',
            }}
          >
            <MessageList messages={messages} myRoles={myRoles} chatStyles={chatStyles} preview={preview} MessageComponent={MessageComponent} blank={blank} previewMessages={previewMessages} />
            <div ref={messagesEndRef} />
          </Box>
          <Typography
            variant="caption"
            color="#000"
            sx={{
              visibility: isTypingUser ? 'visible' : 'hidden',
              opacity: isTypingUser ? 1 : 0,
              transition: 'visibility 0.3s ease, opacity 0.3s ease',
              position: 'absolute',
              bottom: '0.75rem',
              left: '1.5rem',
              padding: '0.25rem 0.5rem',
              boxShadow: '0 0 0.5rem 0 rgba(0,0,0,0.2)',
              backgroundColor: `rgba(255, 255, 255, 0.6)`,
              borderRadius: '0.5rem',
              backdropFilter: 'blur(4px)',
              zIndex: 1000
            }}
            component="div"
          >
            {isTypingUser} is typing...
          </Typography>
        </Box>
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
  domain = 'https://mrghost.ai',
} : {botId: string, chatId?: string | null, userId?: string | null, visible?: boolean, domain?: string}) {
  const { functions } = useContext(ActionContext);
  return (
    <div style={{ display: visible ? 'block' : 'none', height: '100%', width: '100%' }}>
      <BotProvider botId={botId} domain={domain}>
        <ChatProvider
          domain={domain}
          botId={botId}
          chatId={chatId}
          botUserId={userId}
          preview={false}
          additionalFunctions={functions}
        >
          <ChatClient
            chatStyles={{}}
            exitHandler={null}
            preview={false}
            messageComponent={DefaultMessage}
            blank={false}
          />
        </ChatProvider>
      </BotProvider>
    </div>
  );
}

function ChatReadMonitor({isChatOpen} : {isChatOpen: boolean}) {
  const { messages, setHasUnreadMessages } = useContext(ChatContext);
  const [lastNumMessages, setLastNumMessages] = useState(0);
  useEffect(() => {
    console.log('ChatReadMonitor', messages.length, isChatOpen);
    if (isChatOpen) {
      console.log(`chat is open, setting unread messages to false`);
      setHasUnreadMessages(false);
    } else {
      if (messages.length > lastNumMessages) {
        console.log(`chat is closed, setting unread messages to true`);
        setHasUnreadMessages(true);
      }
    }
    setLastNumMessages(messages.length);
  }, [messages.length, isChatOpen]);
  return null;
}

export function BubbleChat({
  botId,
  chatId = null,
  userId = null,
  icon = null,
  domain = 'https://mrghost.ai',
} : {botId: string, chatId?: string | null, userId?: string | null, visible?: boolean, icon?: any | null, domain?: string}) {
  const { bot } = useContext(BotContext);
  const { functions } = useContext(ActionContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(isChatOpen);

  useEffect(() => {
    if (isChatOpen) {
      setIsChatVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsChatVisible(false);
      }, 100); // Delay matches the transition duration

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isChatOpen]);

  const handleOnClick = () => {
    console.debug('clicked', isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

  return (
    <BotProvider botId={botId} domain={domain}>
      <ChatProvider
        botId={botId}
        chatId={chatId}
        botUserId={userId}
        preview={false}
        additionalFunctions={functions}
        domain={domain}
      >
        <ChatIconButton
          icon={icon}
          handleOnClick={handleOnClick}
          defaultStyles={{}}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '6rem',
            right: '1rem',
            width: 'calc(100% - 2rem)',
            maxWidth: '30rem',
            height: 'calc(100% - 7rem)',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 0 0.75rem 0 rgba(0,0,0,0.2)',
            transform: isChatOpen ? 'scale(1)' : 'scale(0.9)',
            opacity: isChatOpen ? 1 : 0,
            visibility: isChatVisible ? 'visible' : 'hidden',
            transition: 'transform 0.1s ease-in-out, opacity 0.1s ease-in-out',
            transformOrigin: 'right bottom'
          }}
        >
          <ChatReadMonitor isChatOpen={isChatOpen} />
          <ChatClient
            chatStyles={bot?.styles || {}}
            exitHandler={handleOnClick}
            preview={false}
            messageComponent={DefaultMessage}
            blank={false}
          />
        </Box>
      </ChatProvider>
    </BotProvider>
  );
}
