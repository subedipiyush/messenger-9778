const moveConversationToTop = (conversations, predicate, message) => {

  const newConversations = []
  newConversations.push(null)

  conversations.forEach((convo) => {
    if (predicate(convo)) {
      const convoCopy = { ...convo};
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (convoCopy.otherUser.id === message.senderId){
        convoCopy.otherUser.isTyping = false;
        convoCopy.numberOfUnseenMsgs += 1;
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
      id: message.conversationId ,
      otherUser: sender,
      messages: [message]
    };
    newConvo.latestMessageText = message.text;
    newConvo.otherUser.isTyping = false;
    newConvo.numberOfUnseenMsgs = 0;
    return [newConvo, ...state];
  }

  return moveConversationToTop(state, (convo) => convo.id === message.conversationId, message);
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
  return moveConversationToTop(state, (convo) => convo.otherUser.id === recipientId, message);
};

export const setMsgsSeenInStore = (state, payload) => {
  const { conversation, userId } = payload;

  return state.map((convo) => {
    if (convo.id === conversation.id) {
      const convoCopy = { ...convo };
      if (convoCopy.otherUser.id === userId) {
        convoCopy.otherUser.lastSeenMsg = convoCopy.messages[convoCopy.messages.length - 1]; 
      } else {
        convoCopy.numberOfUnseenMsgs = 0;
      }
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