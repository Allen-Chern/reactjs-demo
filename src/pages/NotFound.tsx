import { Container, Typography } from "@material-ui/core";
import { formStyles } from "../utils/form-styles";


const NotFound = () => {
  const classes = formStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Not Found
        </Typography>
      </div>
    </Container>
  );
};

export default NotFound;
