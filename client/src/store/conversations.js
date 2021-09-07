import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  setMsgsReadInStore,
  setConvoTypingStateInStore
} from "./utils/reducerFunctions";


// UTILITIES

export const sort = (conversations) => {

  function comparator(convo1, convo2) {

    const convo1LatestMessage = convo1.latestMessage || {};
    const convo2LatestMessage = convo2.latestMessage || {};

    if (!convo1LatestMessage.createdAt)
      // fake convo (usually pops up when searching for users)
      return 1;

    if (!convo2LatestMessage.createdAt)
      return -1;

    const convo1UpdatedAt = Date.parse(convo1LatestMessage.createdAt);
    const convo2UpdatedAt = Date.parse(convo2LatestMessage.createdAt);

    // descending order
    return convo2UpdatedAt - convo1UpdatedAt;
  }

  return [...conversations].sort(comparator);

}

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const SET_MSGS_READ = "SET_MSGS_READ";
const SET_TYPING_STATE = "SET_TYPING_STATE";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const setMsgsRead = (conversation, user, messages) => {
  return {
    type: SET_MSGS_READ,
    payload: { conversation, user, messages }
  };
};

export const setConvoTypingState = (conversationId, isTyping) => {
  return {
    type: SET_TYPING_STATE,
    conversationId,
    isTyping
  }
}

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return action.conversations;
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case SET_MSGS_READ:
      return setMsgsReadInStore(state, action.payload);
    case SET_TYPING_STATE:
      return setConvoTypingStateInStore(state, action.conversationId, action.isTyping);
    default:
      return state;
  }
};

export default reducer;
