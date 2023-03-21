import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/auth-context';
import { sendResetNameRequest } from '../services/api';
import { formStyles } from '../utils/form-styles';

type FormInputs = {
  name: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const ResetName = () => {
  const classes = formStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const responseHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      setUser(response.data);
      enqueueSnackbar('Success.', { variant: "success" });
      navigate('/profile');
    }
  }

  const onSubmit = async (data: FormInputs) => {
    const response = await sendResetNameRequest(data);
    responseHandler(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Name
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            {...register("name")}
            label="Name"
            defaultValue={user?.name}
            variant="outlined"
            margin="normal"
            fullWidth
            type="text"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )
};

export default ResetName;