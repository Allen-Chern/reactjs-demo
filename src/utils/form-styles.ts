import { makeStyles } from "@material-ui/core";

export const formStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    backgroundColor: "#3f51b5",
    width: "100%",
    height: 3,
    margin: "24px 0",
  },
}));
