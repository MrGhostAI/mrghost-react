import { useEffect, useState } from 'react';
import {Socket, io} from 'socket.io-client';

// const SOCKET_URL = process.env.NODE_ENV === 'development' ? 'https://monkey-bright-closely.ngrok-free.app/chat' : 'https://app.mrghost.ai/chat';

/**
 * Custom hook to handle chat socket connection.
 * @param isAdmin - Whether the user is an admin.
 * @param preview - Whether the chat is in preview mode.
 * @param postLocalStorage - Whether the chat is in an iframe.
 * @param dispatch - The dispatch function to update the chat state.
 * @param functions - Additional functions to emit events.
 */

const useChatSocket = ({ domain = "https://app.mrghost.ai", isAdmin, preview, postLocalStorage, dispatch, functions=null} : {
  domain?: string,
  isAdmin: boolean,
  preview: boolean,
  postLocalStorage: boolean | null,
  dispatch: any,
  functions: any,
}) => {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // If in preview mode or if the socket should not be initialized, return early.
    console.log(`running useEffect ${isAdmin} ${preview} ${domain} ${postLocalStorage}`);
    if (preview) return;

    // Initialize socket connection.
    let socket : any;
    if (postLocalStorage) {
      console.log('iframe chat');
      socket = io(`${domain}/chat`, {
        transports: ['websocket'],
      });
    } else {
      if (isAdmin) {
        console.log('admin chat');
        socket = io(`${domain}/chat`, {
          withCredentials: true
        });
      } else {
        console.log('user chat');
        socket = io(`${domain}/chat`);
      }
    }
    setChatSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Event listener for when a new message is received.
    socket.on('receive_message', (message : any
    ) => {
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    });

    let typingTimer : any;

    // Event listener for typing indicator.
    socket.on('typing', ({ botUser, isTyping } : { botUser: any, isTyping: boolean }) => {
      dispatch({
        type: 'SET_TYPING_USER',
        payload: isTyping ? botUser : null,
      });

      console.log('typing', botUser, isTyping);

      clearTimeout(typingTimer);
      //set interval to false after 2 seconds
      typingTimer = setTimeout(() => {
        console.log('typingTimer end');
        dispatch({ type: 'SET_TYPING_USER', payload: null });
      }, 1000);
    });

    // Event listener for message edits.
    socket.on('edit_message', (message : any) => {
      dispatch({ type: 'UPDATE_MESSAGE', payload: message });
    });

    socket.on('receive_message_fragment', (fragment : any) => {
      console.log('receive message fragment', fragment);
      if (!fragment) return;
      dispatch({ type: 'ADD_MESSAGE_FRAGMENT', payload: fragment });
    });

    // Handle socket connection errors.
    socket.on('error', (error : any) => {
      console.error('Socket error:', error);
    });

    // Cleanup function to disconnect the socket when the component unmounts.
    return () => {
      socket.off('receive_message');
      socket.off('typing');
      socket.off('edit_message');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message_fragment');
      socket.off('error');
      socket.disconnect();
    };
  }, [isAdmin, preview, postLocalStorage, dispatch]);

  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.on('call_action', (response : any) => {
      const { action, params } = response;
      console.log('call_action', action, params);
      console.log('functions', functions);
      const selectedFunction = functions.find((fn: any) => fn.name === action);

      if (!selectedFunction) {
        console.error(`No action found with the name: ${action}`);
        return;
      }

      const { fn } = selectedFunction;
      const result = fn(params);

      chatSocket.emit('action_response',
        action,
        result,
      );
    });

    return () => {
      chatSocket.off('call_action');
    };
  }, [chatSocket, functions]);

  // Additional functions to emit events can be added here.
  return {
    chatSocket,
    isSocketConnected: isConnected,
    emitTyping: () => {
      if (!chatSocket) return;
      chatSocket.emit('typing', true);
    },
    emitMessage: (sentMessage: any, updateBotUserId: Function, updateChatId: Function, callback: Function) => {
      if (!chatSocket) return;
      chatSocket.emit('send_message', sentMessage, (messageReceipt : any) => {
        console.log('Message sent, response:', messageReceipt);
        updateBotUserId(messageReceipt.sender?._id || messageReceipt.sender);
        updateChatId(messageReceipt.chat?._id || messageReceipt.chat);
        dispatch({ type: 'ADD_MESSAGE', payload: messageReceipt });
        callback(messageReceipt);
      });
    },
    emitEditMessage: (message: any) => {
      if (!chatSocket) return;
      chatSocket.emit('edit_message', message);
    },
  };
};

export default useChatSocket;
