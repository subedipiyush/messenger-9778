import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  CardMedia,
  SvgIcon,
} from "@material-ui/core";
import bgimg from '../assets/images/bg-img.png'
import {ReactComponent as bubble} from '../assets/images/bubble.svg';
import { theme } from '../themes/theme';
import { common } from '../common.style';


const useStyles = makeStyles({
  media: {
    height: "100%",
    backgroundPosition: "inherit",
  },
  overlay: {
    background: 'linear-gradient(#3A8DFF, #86B9FF)',
    opacity: '85%',
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%"
  },
  largeWhiteText: {
    color: "white",
    fontSize: "x-large",
    textAlign: "center"
  },
  svg: {
    width: "auto",
    height: "auto",
    marginBottom: theme.spacing(3)
  },
  ...common
});


const AppLogo = (props) => {
  const classes = useStyles();

  return (
    <Box position="relative" height="100%">
      <CardMedia className={classes.media}
                  image={bgimg} />
      <Box className={`${classes.overlay} ${classes.center}`}>
          <Box className={classes.center} mt={-12}>
            <SvgIcon component={bubble} viewBox="0 0 67 67" className={classes.svg} />
            <Box px={5}>
              <Typography className={classes.largeWhiteText}>Converse with anyone with any language</Typography>
            </Box>
          </Box>
      </Box>
    </Box>
  );

};

export default AppLogo;