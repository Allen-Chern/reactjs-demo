import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, Link, TextField, Typography } from "@material-ui/core";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { formStyles } from '../utils/form-styles';

type FormInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (accept: @$!%*#?&)"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const classes = formStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
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
            {...register("name")}
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
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
            Register
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have one? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
};

export default Register;