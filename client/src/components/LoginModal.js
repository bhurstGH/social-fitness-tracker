import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";
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

function LoginModal(props) {
  const { classes, snack } = props;

  const { setCurrentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/users/login", userInput)
      .then(res => {
        setCurrentUser({
          username: res.data.username,
          email: res.data.email,
          id: res.data._id
        });
        snack("Login Success!", "success");
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setUser({
      ...userInput,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        {/* Nudge icon away from text */}
        Login <AccountCircle className={classes.ml} />
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modal}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus={true}
              id="email"
              name="email"
              label="Email"
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
              required
              onChange={handleChange}
            />
            <Button
              className={classes.mt}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
  snack: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginModal);
