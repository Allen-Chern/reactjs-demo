import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { sendLogoutRequest } from "../services/api";

function Navbar() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setUser, isAuthenticated, isActivated} = useAuth();

  const responseHandler = (response: AxiosResponse<any,any>) => {
    if(response.status === 400) {
      enqueueSnackbar(response.data.error, { variant: "error" });
    }
    else {
      setUser(null);
      enqueueSnackbar('Success.', { variant: "success" });
      navigate('/login');
    }
  }
  
  const handleLogout = async () => {
    const response = await sendLogoutRequest();
    responseHandler(response);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            ReactJS Demo
          </Typography>
          { isAuthenticated ? (
            <React.Fragment>
            { isActivated ? (
              <React.Fragment>
                <Button color="inherit" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button color="inherit" onClick={() => navigate("/statistics")}>
                  Statistics
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
              </React.Fragment>
            ) : (
              <Button color="inherit" onClick={() => navigate("/inactivate")}>
                Resend Verification
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;