import { Container, TextField, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { sendDashboardRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";
import { getTimeStamp } from "../utils/time-stamp";

type LoginInfo = {
  userCreatedAt: string;
  loginCount: string;
  lastLoginTime: string;
}

const Dashboard = () => {
  const classes = formStyles();
  const { user } = useAuth();
  const [data, setData] = useState<LoginInfo>({
    userCreatedAt: '',
    loginCount: '',
    lastLoginTime: ''
  });
  
  const responseHandler = (response: AxiosResponse<any,any>) => {
    setData({
      userCreatedAt: getTimeStamp(user?.createdAt),
      loginCount: response.data.loginCount.toString(),
      lastLoginTime: getTimeStamp(response.data.lastLoginTime)
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendDashboardRequest();
      responseHandler(response);
    }
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Dashboard
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Timestamp of user sign up"
            value={data.userCreatedAt}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            label="Number of times logged in"
            value={data.loginCount}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            label="Timestamp of the last user session"
            value={data.lastLoginTime}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
        </form>
      </div>
    </Container>
  );
};

export default Dashboard;
