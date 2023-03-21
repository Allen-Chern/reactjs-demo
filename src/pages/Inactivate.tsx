import { Button, Container, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { sendResendVerificationRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";

const Inactivate = () => {
  const classes = formStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const responseHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      enqueueSnackbar('You will recieve a verification mail, please check your email inbox.', { variant: "success" });
      navigate('/login');
    }
  }

  const onClick = async () => {
    const response = await sendResendVerificationRequest();
    responseHandler(response);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Resend Verification Mail
        </Typography>
        <Button type="button" variant="contained" color="secondary" onClick={onClick} fullWidth>
            Resend
        </Button>
      </div>
    </Container>
  );
};

export default Inactivate;
