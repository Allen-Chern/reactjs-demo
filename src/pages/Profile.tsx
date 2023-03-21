import { Button, Container, Divider, TextField, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { formStyles } from "../utils/form-styles";

const Profile = () => {
  const classes = formStyles();
  const navigate = useNavigate();
  const { user, isBasic } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Profile
        </Typography>
        <form className={classes.form}>
          <TextField
            label="Name"
            value={user?.name}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
          <TextField
            label="Email"
            value={user?.email}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
          />
        </form>
        <Divider className={classes.divider} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => navigate("/resetName")}
        >
          Reset Name
        </Button>
        { isBasic ? (
          <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => navigate("/resetPassword")}
        >
          Reset Password
        </Button>
        ) : (
          <></>
        )}
        
      </div>
    </Container>
  );
};

export default Profile;
