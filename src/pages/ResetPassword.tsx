import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../context/auth-context';
import { useLoading } from '../context/loading-context';
import { sendResetPasswordRequest } from '../services/api';
import { formStyles } from '../utils/form-styles';

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  oldPassword: yup.string().required("Origial Password is required"),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "New Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (accept: @$!%*#?&)"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "New Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword = () => {
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
  const { isBasic } = useAuth();
  const { setLoading } = useLoading();

  useEffect(() => {
    if(!isBasic) {
      navigate("/profile");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responseHandler = (response: AxiosResponse<any,any>) => {
    setLoading(false);
    
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      enqueueSnackbar('Success.', { variant: "success" });
      navigate('/profile');
    }
  }

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    
    const response = await sendResetPasswordRequest(data);
    responseHandler(response);
  };


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            {...register("oldPassword")}
            label="Original Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
          />
          <TextField
            {...register("newPassword")}
            label="New Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
          <TextField
            {...register("confirmPassword")}
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )
};

export default ResetPassword;