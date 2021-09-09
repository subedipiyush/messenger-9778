import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  TextField,
  CardMedia,
  SvgIcon,
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { login } from "./store/utils/thunkCreators";
import bgimg from './assets/images/bg-img.png'
import {ReactComponent as bubble} from './assets/images/bubble.svg';

const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
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
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  largeWhiteText: {
    color: "white",
    fontSize: "x-large",
    textAlign: "center"
  },
  svg: {
    width: "auto",
    height: "auto",
    marginBottom: "25px"
  },
  welcomeText: {
    fontWeight: "bold"
  },
  largeButton: {
    width: "150px",
    padding: "15px"
  }
});


const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={5} direction="column">
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
      </Grid>
      <Grid item container xs={12} sm={7} md={7} direction="column" component={Paper} elevation={1}>
        <Box p={2} m={2}>
          <Grid item container direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Typography color="textSecondary" size="small">
                Don't have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Box
                  boxShadow={2}
                  bgcolor="background.paper"
                >
                <Button onClick={() => history.push("/register")}
                        color="primary"
                        className={classes.largeButton}
                        >
                  Create Account
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item container direction="column">
            <Box px={6} mt={10}>
              <Box>
                <Typography component="h1" variant="h5" className={classes.welcomeText}>
                  Welcome back!
                </Typography>
              </Box>
              <Box my={2} pr={4}>
                <form onSubmit={handleLogin}>
                  <Grid item>
                    <FormControl margin="normal" fullWidth required>
                      <TextField
                        aria-label="username"
                        label="Username"
                        name="username"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                      <FormControl margin="normal" fullWidth required>
                        <TextField
                          label="Password"
                          aria-label="password"
                          type="password"
                          name="password"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.center}>
                    <Box mt={5}>
                      <Button className={classes.largeButton} type="submit" variant="contained" size="large" color="primary">
                        Login
                      </Button>
                    </Box>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
