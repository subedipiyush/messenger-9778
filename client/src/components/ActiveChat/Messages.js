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

  const firstUnseenMsgIdx = messages.findIndex((msg) => !msg.seen);

  const seenMsgs = messages.slice(0, firstUnseenMsgIdx == -1 ? messages.length : firstUnseenMsgIdx);
  const unseenMsgs = messages.slice(firstUnseenMsgIdx == -1 ? messages.length : firstUnseenMsgIdx, messages.length); 

  return (
    <Box>
      {seenMsgs.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} time={time} />
          ) : (
            <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isTyping={false} />
          );
        })
      }
      {seenMsgs.length > 0 &&
        (<Box className={classes.rightAligned}>
          <MiniAvatar alt={otherUser.username} src={otherUser.photoUrl}></MiniAvatar>
        </Box>)
      }
      {unseenMsgs.map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return (
            <SenderBubble key={message.id} text={message.text} time={time} />
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
