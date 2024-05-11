
const chatReducer = (state = { chat: null, messages: [], isTypingUser: null }, action : any) : any => {
  let index : any;
  let newMessages : any;
  switch (action.type) {
    case 'SET_MESSAGES':
      // Set the entire messages array
      return { ...state, messages: action.payload };

    case 'ADD_MESSAGE':
      // Add a new message to the messages array
      console.log('ADD_MESSAGE', action.payload, state);
      return { ...state, messages: [...state.messages, action.payload] };

    case 'UPDATE_MESSAGE':
      // Update a specific message in the messages array
      index = state.messages.findIndex((prevMessage : any) => {
        return action.payload._id === prevMessage._id;
      });
      if (index === -1) {
        newMessages = state.messages;
      } else {
        newMessages = [...state.messages];
        newMessages[index] = action.payload;
      }
      return {
        ...state,
        messages: newMessages,
      };

    case 'ADD_MESSAGE_FRAGMENT':
      // Add a new message fragment to the messages array
      index = state.messages.findIndex((prevMessage : any) => {
        return action.payload._id === prevMessage._id;
      });
      if (index === -1) {
        // create new message
        newMessages = [...state.messages, action.payload];
      } else {
        // update message
        newMessages = [...state.messages];
        newMessages[index] = { ...newMessages[index], text: newMessages[index].text + action.payload.text };
      }
      return { ...state, messages: newMessages };

    case 'REMOVE_MESSAGE':
      // Remove a specific message from the messages array
      return {
        ...state,
        messages: state.messages.filter(
          (message: any) => message._id !== action.payload
        ),
      };

    case 'SET_TYPING_USER':
      // Set the user who is currently typing
      return { ...state, isTypingUser: action.payload };

    case 'SET_CHAT':
      // Set the entire chat object
      return { ...state, chat: action.payload };

    default:
      return state;
  }
};

export default chatReducer;