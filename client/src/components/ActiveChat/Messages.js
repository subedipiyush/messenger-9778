import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";


const useStyles = makeStyles(() => ({
  rightAligned: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  miniAvatar: {
    height: 15,
    width: 15,
    marginRight: 11,
    marginTop: 6
  }
}));

const Messages = (props) => {
  const classes = useStyles();

  const { messages, unreadMsgs, otherUser, userId } = props;

  return (
    <Box>
      <Box>
        {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} time={time} />
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isTyping={false}/>
          );
        })}
      </Box>
      <Box className={classes.rightAligned}>
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.miniAvatar}></Avatar>
      </Box>
      <Box>
        {unreadMsgs.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} time={time} />
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isTyping={false}/>
          );
        })}
      </Box>
      <Box>
        {otherUser.isTyping &&
          <OtherUserBubble key="{'pendingMsgKey' + message.id}" text="" time="" otherUser={otherUser} isTyping={true} />
        }
      </Box>
    </Box>
  );
};

export default Messages;
