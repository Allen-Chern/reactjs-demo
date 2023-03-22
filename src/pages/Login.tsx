import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button, Container, Divider, Grid, Link, TextField, Typography
} from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { facebookLoginUrl, googleLoginUrl } from "../configs/api";
import { useAuth } from "../context/auth-context";
import { sendLoginRequest } from "../services/api";
import { formStyles } from "../utils/form-styles";

type FormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
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
  const { fetchUser } = useAuth();

  const responseHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      enqueueSnackbar('Success.', { variant: "success" });
      fetchUser();
    }
  }

  const onSubmit = async (data: FormInputs) => {
    const response = await sendLoginRequest(data);
    responseHandler(response);
  };

  const handleFacebookLogin = () => {
    window.location.href = facebookLoginUrl;
  }

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Divider className={classes.divider} />
        <Typography variant="body1" gutterBottom>
          or sign in with
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleFacebookLogin}
        >
          Sign in with Facebook
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      </div>
    </Container>
  );
};

export default Login;
