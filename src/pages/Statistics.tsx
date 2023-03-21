import { Container, TextField, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { sendStatisticsRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";

type StatisticsInfo = {
  totalUsers: string;
  activeSessionUsers: string;
  avgSevenDayUsers: string;
}

const Statistics = () => {
  const classes = formStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<StatisticsInfo>({
    totalUsers: '',
    activeSessionUsers: '',
    avgSevenDayUsers: ''
  });
  
  const responseHandler = (response: AxiosResponse<any,any>) => {
    setData({
      totalUsers: response.data.totalUsers.toString(),
      activeSessionUsers: response.data.activeSessionUsers.toString(),
      avgSevenDayUsers: response.data.avgSevenDayUsers.toString(),
    });
    enqueueSnackbar('Success.', { variant: "success" });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendStatisticsRequest();
      responseHandler(response);
    }
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Statistics
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Total number of users who have signed up"
            value={data.totalUsers}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            label="Total number of users with active sessions today"
            value={data.activeSessionUsers}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            label="Average number of active session users in the last 7 days rolling"
            value={data.avgSevenDayUsers}
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

export default Statistics;
