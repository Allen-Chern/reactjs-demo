import { Container, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { sendVerificationRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";

const Verification = () => {
  const classes = formStyles();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { token } = useParams<{token: string}>();

  const messageHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      console.log(response);
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      enqueueSnackbar('Success.', { variant: "success" });
      navigate('/login');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if(token) {
        const response = await sendVerificationRequest(token);
        messageHandler(response);
      }
    }
  
    fetchData();
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          E-mail Verification
        </Typography>
      </div>
    </Container>
  );
};

export default Verification;