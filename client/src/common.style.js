import { styled } from '@material-ui/core/styles';
import { theme } from './themes/theme'
import Button from '@material-ui/core/Button';


export const LargeButton = styled(Button)({
  width: theme.spacing(20),
  padding: theme.spacing(2)
});

export const common = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  bold: {
    fontWeight: "bold"
  }
};

