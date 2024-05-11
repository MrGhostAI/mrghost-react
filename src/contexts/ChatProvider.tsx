'use client';

import React, { useState, useEffect, useReducer, useContext, createContext } from 'react';
import useChatSocket from '../components/Chat/ChatSocket';
import chatReducer from '../components/Chat/ChatReducer';
import {
  saveChatLocalStorage,
  getChatLocalStorage,
  removeChatLocalStorage,
} from '../components/Chat/Utils/ChatLocalStorage';

interface ChatContextType {
  chat: any;
  messages: any[];
  isTypingUser: any;
  sendMessage: (text: string, callback?: () => void) => void;
  setBotUserData: (data: Object) => void;
  userIsTyping: () => void;
  emitMessageBotUser: ({ message, prompt } : { message?: string, prompt?: string }) => void;
  isAdmin: boolean;
  refreshChatLocalStorage: (botId: string) => void;
  chatId: string | null;
  additionalFunctions: any;
  hasUnreadMessages: boolean;
  setHasUnreadMessages: (hasUnreadMessages: boolean) => void;
  bubbleVisible: boolean;
  setBubbleVisible: (bubbleVisible: boolean) => void;
}

export const ChatContext = createContext<ChatContextType>({
  chat: null,
  messages: [],
  isTypingUser: null,
  sendMessage: () => {},
  setBotUserData: () => {},
  emitMessageBotUser: () => {},
  userIsTyping: () => {},
  isAdmin: false,
  refreshChatLocalStorage: () => {},
  chatId: null,
  additionalFunctions: null,
  hasUnreadMessages: false,
  setHasUnreadMessages: () => {},
  bubbleVisible: false,
  setBubbleVisible: () => {},
});

export const ChatProvider = ({
  domain = 'https://app.mrghost.ai',
  botId,
  isAdmin = false,
  chatId: startChatId = null,
  botUserId: startBotUserId = null,
  postLocalStorage = null,
  preview = false,
  additionalFunctions = null,
  contexts=null,
  children,
} : {
  domain?: string,
  botId: string,
  isAdmin?: boolean,
  chatId?: string | null,
  botUserId?: string | null,
  postLocalStorage?: boolean | null,
  preview?: boolean,
  contexts?: string[] | null,
  additionalFunctions?: any,
  children: React.ReactNode,
}
) => {
  console.log('ChatProvider', botId, isAdmin, startChatId, startBotUserId, postLocalStorage, preview, additionalFunctions);
  const [chatId, setChatId] = useState(
    startChatId || getChatLocalStorage(botId, 'chatId')
  );
  const [botUserId, setBotUserId] = useState(
    startBotUserId || getChatLocalStorage(botId, 'botUserId')
  );
  const [botUser, setBotUser] = useState(null); // [TODO] Implement botUser state
  const [chatState, dispatch] = useReducer(chatReducer, {
    chat: null,
    messages: [],
    isTypingUser: null,
  });
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // Custom hook to manage socket connection and events
  const {
    chatSocket,
    isSocketConnected,
    emitMessage,
    emitBotUserData,
    emitTyping,
    emitMessageBotUser,
  } = useChatSocket({
    domain,
    isAdmin,
    preview,
    postLocalStorage,
    dispatch,
    setHasUnreadMessages,
    functions: additionalFunctions
  });

  function updateChatId(newChatId : string) {
    if (newChatId !== chatId) {
      console.debug('updateChatId', newChatId, chatId);
      setChatId(newChatId);
      saveChatLocalStorage(botId, 'chatId', newChatId);
    }
  }

  function updateBotUserId(newBotUserId : string) {
    if (newBotUserId && newBotUserId !== botUserId) {
      console.debug('updateBotUserId', newBotUserId, botUserId);
      setBotUserId(newBotUserId);
      saveChatLocalStorage(botId, 'botUserId', newBotUserId);
    }
  }

  useEffect(() => {
    console.debug('start ids changed', startChatId, startBotUserId);
    let newChatId = startChatId || getChatLocalStorage(botId, 'chatId');
    const newBotUserId = startBotUserId || getChatLocalStorage(botId, 'botUserId');
    if (getChatLocalStorage(botId, 'chatUserId')) {
      newChatId = null;
      removeChatLocalStorage(botId, 'chatUserId');
    }
    setChatId(newChatId);
    setBotUserId(newBotUserId);
  }, [startChatId, startBotUserId, botId]);

  useEffect(() => {
    // Ensure that the socket exists and is connected before proceeding
    if (!chatSocket || !isSocketConnected || !botId) return;

    const joinChatData = {
      incomingBotId: botId,
      incomingChatId: chatId,
      incomingBotUserId: botUserId,
      isAdmin: isAdmin,
    };

    console.log('Joining chat with data:', joinChatData);

    // Emit a 'join_chat' event to the socket server
    chatSocket.emit('join_chat', joinChatData, (response : any) => {
      console.log('Joined chat successfully:', response);

      // Update chatId and chatUserId from the response if they are different
      updateChatId(response.chatId);
      updateBotUserId(response.botUserId);
      setBotUser(response.botUser || {});

      // Update messages if provided in the response
      dispatch({ type: 'SET_MESSAGES', payload: response.messages || [] });
    });
  }, [isSocketConnected, botId, chatId, botUserId]);

  function sendMessage(text : string, callback : () => void) {
    console.log('sending message', text);
    console.log('additionalFunctions', additionalFunctions);
    if (!text) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const joinedContexts = contexts ? contexts.join('. ') : '';
    const messageObject = {
      text,
      botId,
      chatId,
      botUserId,
      additionalFunctions,
      messagePrompt: joinedContexts,
      tz,
    };
    console.log('messageObject', messageObject);
    emitMessage(messageObject, updateBotUserId, updateChatId, callback);
  }

  function messageBotUser({ message, prompt } : { message?: string, prompt?: string }) {
    console.log('messageBotUser', message, prompt);
    emitMessageBotUser({ message, prompt });
  }

  function setBotUserData(data : Object) {
    setBotUser((prevBotUser: any) => (
      { ...(prevBotUser || {}), data: {...(prevBotUser?.data || {}), ...data} }
    ));
    emitBotUserData(data);
  }

  function userIsTyping() {
    emitTyping();
  }

  function refreshChatLocalStorage(botId : string) {
    localStorage.removeItem(`${botId}_chatId`);
    setChatId(null);
  }

  console.log('chatState', chatState);

  return (
    <ChatContext.Provider
      value={{
        ...chatState,
        hasUnreadMessages,
        setHasUnreadMessages,
        sendMessage,
        setBotUserData,
        botUser,
        userIsTyping,
        messageBotUser,
        isAdmin,
        refreshChatLocalStorage,
        chatId,
        additionalFunctions,
        bubbleVisible,
        setBubbleVisible
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
