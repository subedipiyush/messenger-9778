import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, SvgIcon } from "@material-ui/core";
import { ReactComponent as TypingBubble } from '../../assets/images/bubble.svg';


const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, isTyping } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        { isTyping && 
          <>
          <Typography className={classes.usernameDate}>
            {otherUser.username}
          </Typography>
          <Box className={classes.bubble}>
            <SvgIcon component={TypingBubble} viewBox="0 0 67 67"/>
          </Box>
          </>
        }
        { !isTyping && 
          <>
          <Typography className={classes.usernameDate}>
            {otherUser.username} {time}
          </Typography>
          <Box className={classes.bubble}>
            <Typography className={classes.text}>{text}</Typography> 
          </Box> 
          </>
        }
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
