import React from "react";
import { Box, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "bold"
  },
  typingText: {
    fontStyle: "italic"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const typingDisplayText = 'Typing...';

  const unseenMsgsCount = conversation.numberOfUnseenMsgs;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            { otherUser.isTyping ? ( 
              <Typography className={classes.previewText + ' ' + classes.typingText}>
                {typingDisplayText}
              </Typography>) : (
                <Typography className={unseenMsgsCount > 0 ? classes.unreadText : classes.previewText}>
                  {latestMessageText}
                </Typography>
              )
            }
          </Grid>
          <Grid item xs={4}>
            { !otherUser.isTyping && unseenMsgsCount > 0 &&
              <Badge badgeContent={unseenMsgsCount} color="primary"></Badge>
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatContent;
