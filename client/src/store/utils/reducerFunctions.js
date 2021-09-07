const moveConversationToTop = (conversations, predicate, message) => {

  const newConversations = []
  newConversations.push(null)

  conversations.forEach((convo) => {
    if (predicate(convo)) {
      const convoCopy = { ...convo};
      convoCopy.id = message.unreadConversationId;
      convoCopy.unreadMsgs.push(message);
      convoCopy.latestMessage = message;
      if (convoCopy.otherUser.id === message.senderId){
        convoCopy.otherUser.isTyping = false;
      }
      newConversations[0] = convoCopy;
    } else {
      newConversations.push(convo);
    }
  });

  return newConversations
}


export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.unreadConversationId ,
      otherUser: sender,
      messages: [],
      unreadMsgs: [message]
    };
    newConvo.latestMessage = message;
    newConvo.otherUser.isTyping = false;
    return [newConvo, ...state];
  }

  return moveConversationToTop(state, (convo) => convo.id === message.unreadConversationId, message);
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};


export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });

  return moveConversationToTop(state, (convo) => convo.otherUser.id === recipientId, message);
};

export const setMsgsReadInStore = (state, payload) => {
  const { conversation, user, messages } = payload;

  return state.map((convo) => {
    if (convo.id === conversation.id) {
      const convoCopy = { ...convo };
      convoCopy.messages = convoCopy.messages.concat(messages.map((msg) => { 
        msg.conversationId = conversation.Id;
        msg.unreadConversationId = null;
        return msg;
      }));
      convoCopy.unreadMsgs = convoCopy.unreadMsgs.filter((msg) => msg.senderId === user.id);
      return convoCopy;
    } else {
      return convo;
    }
  });
};


export const setConvoTypingStateInStore = (state, conversationId, isTyping) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.isTyping = isTyping;
      return convoCopy;
    } else {
      return convo;
    }
  });
}