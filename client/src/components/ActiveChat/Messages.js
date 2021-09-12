import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { theme } from '../../themes/theme'
import moment from "moment";

const useStyles = makeStyles(() => ({
  rightAligned: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  }
}));

const MiniAvatar = styled(Avatar)({
  height: theme.spacing(2),
  width: theme.spacing(2),
  marginRight: theme.spacing(1.5),
  marginTop: theme.spacing(0.8)
});

const Messages = (props) => {
  const classes = useStyles();

  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <>
            <SenderBubble key={message.id} text={message.text} time={time} />
            {message.id === otherUser.lastSeenMsg.id && 
              <Box key={"mini-avatar-" + message.id} className={classes.rightAligned}>
                <MiniAvatar alt={otherUser.username} src={otherUser.photoUrl}></MiniAvatar>
              </Box>
            }
            </>
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isTyping={false} />
          );
        })
      }
      <Box>
        {otherUser.isTyping &&
          <OtherUserBubble key="pendingMsgKey" text="" time="" otherUser={otherUser} isTyping={true} />
        }
      </Box>
    </Box>
  );
};

export default Messages;
