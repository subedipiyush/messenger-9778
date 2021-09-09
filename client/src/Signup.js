import React, { useState } from "react";
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
  CssBaseline,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from '@material-ui/core/styles';
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
                Already have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Box
                  boxShadow={2}
                  bgcolor="background.paper"
                >
                <Button onClick={() => history.push("/login")}
                        color="primary"
                        className={classes.largeButton}
                        >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item container direction="column">
            <Box px={6} mt={10}>
              <Box>
                <Typography component="h1" variant="h5" className={classes.welcomeText}>
                  Create an account.
                </Typography>
              </Box>
              <Box my={2} pr={4}>
                <form onSubmit={handleRegister}>
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
                        aria-label="e-mail address"
                        label="E-mail address"
                        name="email"
                        type="email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                      <FormControl margin="normal" error={!!formErrorMessage.confirmPassword} fullWidth required>
                        <TextField
                          label="Password"
                          aria-label="password"
                          type="password"
                          name="password"
                          inputProps={{ minLength: 6 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <FormHelperText>
                          {formErrorMessage.confirmPassword}
                        </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                      <FormControl margin="normal" error={!!formErrorMessage.confirmPassword} fullWidth required>
                        <TextField
                          label="Confirm Password"
                          aria-label="confirm password"
                          type="password"
                          name="confirmPassword"
                          inputProps={{ minLength: 6 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <FormHelperText>
                          {formErrorMessage.confirmPassword}
                        </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.center}>
                    <Box mt={5}>
                      <Button className={classes.largeButton} type="submit" variant="contained" size="large" color="primary">
                        Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
