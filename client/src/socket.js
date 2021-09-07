import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setConvoTypingState,
  setMsgsRead
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on("msgs-read", (data) => {
    store.dispatch(setMsgsRead(data.conversation, data.user, data.messages));
  });

  socket.on("typing-message", (data) => {
    store.dispatch(setConvoTypingState(data.conversationId, data.isTyping));
  });
});

export default socket;
