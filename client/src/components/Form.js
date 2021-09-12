import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  FormHelperText
} from "@material-ui/core";
import { common, LargeButton } from '../common.style';


const useStyles = makeStyles({
  ...common
});

const Form = (props) => {
  const classes = useStyles();

  const { title, onSubmitHandler, inputFields, buttonText} = props;

  return (
      <Grid item container direction="column">
        <Box px={6} mt={10}>
          <Box>
            <Typography component="h1" variant="h5" className={classes.bold}>
              {title}
            </Typography>
          </Box>
          <Box my={2} pr={4}>
            <form onSubmit={onSubmitHandler}>
              {inputFields.map((inputField) => {

                return (
                  <Grid item key={inputField.name}>
                    <FormControl margin="normal" error={inputField.error && inputField.error.on} fullWidth required>
                      <TextField
                          aria-label={inputField.ariaLabel}
                          label={inputField.label}
                          name={inputField.name}
                          type={inputField.type}
                          InputLabelProps={inputField.inputLabelProps || {
                            shrink: true,
                          }}
                          inputProps={inputField.inputProps || {}}
                        />
                    </FormControl>
                    {inputField.error && inputField.error.msg && 
                      <FormHelperText>
                        {inputField.error.msg}
                      </FormHelperText>
                    }
                  </Grid>
                );

              })}
              <Grid item className={classes.center}>
                <Box mt={5}>
                  <LargeButton type="submit" variant="contained" size="large" color="primary">
                    {buttonText}
                  </LargeButton>
                </Box>
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
   );
};

export default Form;