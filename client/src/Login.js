import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { login } from "./store/utils/thunkCreators";
import { Form, AppLogo } from './components';
import { LargeButton } from './common.style';

const useStyles = makeStyles({
  root: {
    height: '100vh'
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
      <Grid item container xs={false} sm={5} md={5} direction="column">
        <AppLogo />
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
              <Box boxShadow={2} bgcolor="background.paper">
                <LargeButton onClick={() => history.push("/register")} color="primary">
                  Create Account
                </LargeButton>
              </Box>
            </Grid>
          </Grid>
          <Form title="Welcome Back" 
                buttonText="Login"
                onSubmitHandler={handleLogin}
                inputFields={[
                  {ariaLabel: "username", label: "Username", name: "username", type: "text"},
                  {ariaLabel: "password", label: "Password", name: "password", type: "password"},
                ]}
          />
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
