import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

const messagesContext = createContext();

const actionTypes = {
  GET_MESSAGES: "GET_MESSAGES",
  SET_MESSAGES: "SET_MESSAGES",
  REMOVE_MESSAGES: "REMOVE_MESSAGES",
};

const messagesReducer = (state, action) => {
  // console.log(JSON.stringify({ state, action }));
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      let found = false;
      state.forEach((item) => {
        if (item.key === action.payload.key) {
          found = true;
          item.value = action.payload.value;
        }
      });
      if (!found) {
        state.push({ key: action.payload.key, value: action.payload.value });
      }
      return;
    case actionTypes.REMOVE_MESSAGES:
      const newstate = state.filter((item) => item.key !== action.payload.key);
      return newstate;
    default:
      return state;
  }
};

export const MessagesProvider = ({ children }) => {
  const [messagesState, messagesDispatch] = useImmerReducer(
    messagesReducer,
    []
  );
  const actions = {
    setMessages: (messageKey, messageValue) => {
      messagesDispatch({
        type: actionTypes.SET_MESSAGES,
        payload: { key: messageKey, value: messageValue },
      });
    },
    getMessages(key) {
      const messages = messagesState.filter(
        (messagesItem) => messagesItem.key === key
      );
      // console.log(messages);
      if (messages.length > 0) {
        return messages[0].value;
      }
      return undefined;
    },
    removeMessages(key) {
      messagesDispatch({
        type: actionTypes.REMOVE_MESSAGES,
        payload: { key },
      });
    },
  };
  return (
    <messagesContext.Provider value={{ actions, messagesState }}>
      {children}
    </messagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(messagesContext);
};
