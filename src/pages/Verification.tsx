import { Button, Container, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { sendVerificationRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";

const Verification = () => {
  const classes = formStyles();
  const [result, setResult] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { token } = useParams<{token: string}>();

  const responseHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
      setShowMessage(response.data.error);
      setResult(false);
    }
    else if(response.status === 500) {
      enqueueSnackbar('Internal server error.', { variant: "error" });
      setShowMessage("Oops, something went wrong.");
      setResult(false);
    }
    else {
      enqueueSnackbar('Verification Success.', { variant: "success" });
      setShowMessage("Congratulations, you can login now!");
      setResult(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if(token) {
        const response = await sendVerificationRequest(token);
        responseHandler(response);
      }
    }
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {showMessage}
        </Typography>
        { result ? (
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> navigate("/login")}
          >
            Login here
          </Button>
          ) : (<></>)
        }
      </div>
    </Container>
  );
};

export default Verification;
