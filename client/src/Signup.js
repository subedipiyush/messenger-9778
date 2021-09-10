import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from '@material-ui/core/styles';
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
      <Grid item container xs={false} sm={5} md={5} direction="column">
        <AppLogo />
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
              <Box boxShadow={2} bgcolor="background.paper">
                <LargeButton onClick={() => history.push("/login")} color="primary">
                  Login
                </LargeButton>
              </Box>
            </Grid>
          </Grid>
          <Form title="Create an account." 
                buttonText="Create"
                onSubmitHandler={handleRegister}
                inputFields={[
                  {ariaLabel: "username", label: "Username", name: "username", type: "text"},
                  {ariaLabel: "e-mail address", label: "E-mail address", name: "email", type: "email"},
                  {ariaLabel: "password", label: "Password", name: "password", type: "password", inputProps: {minLength: 6}, error: { on: !!formErrorMessage.confirmPassword, msg: formErrorMessage.confirmPassword }},
                  {ariaLabel: "confirm password", label: "Confirm Password", name: "confirmPassword", type: "password", inputProps: {minLength: 6}, error: { on: !!formErrorMessage.confirmPassword, msg: formErrorMessage.confirmPassword }},
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
