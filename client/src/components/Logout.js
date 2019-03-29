import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import axios from "axios";
import { UserContext } from "../App";

const styles = theme => ({
  modal: {
    position: "absolute",
    width: "50%",
    backgroundColor: "#fff",
    padding: "2rem",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none"
  },
  ml: {
    marginLeft: "0.25rem"
  },
  mt: {
    marginTop: theme.spacing.unit * 2
  }
});

function Logout(props) {
  const { classes, snack } = props;

  const [currentUser, setCurrentUser] = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .get("/users/logout")
      .then(() => {
        setCurrentUser(null);
        snack("You have logged out.", "warning");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Button color="inherit" onClick={handleSubmit}>
        {/* Nudge icon away from text */}
        Logout <AccountCircle className={classes.ml} />
      </Button>
    </div>
  );
}

Logout.propTypes = {
  classes: PropTypes.object.isRequired,
  snack: PropTypes.func.isRequired
};

export default withStyles(styles)(Logout);
