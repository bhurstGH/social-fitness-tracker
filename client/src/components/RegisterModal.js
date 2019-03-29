import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";
import axios from "axios";

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
  mt: {
    marginTop: theme.spacing.unit * 2
  }
});

function RegisterModal(props) {
  const { classes, snack } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpass: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/users/", userInput)
      .then(res => {
        setIsOpen(false);
        snack("Registered! You can login.", "info");
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
        Register
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modal}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="Username"
              fullWidth
              required
              autoFocus={true}
              onChange={handleChange}
            />
            <TextField
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
            <TextField
              id="confirmpass"
              name="confirmpass"
              label="Confirm Password"
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
              Register
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

RegisterModal.propTypes = {
  classes: PropTypes.object.isRequired,
  snack: PropTypes.func.isRequired
};

export default withStyles(styles)(RegisterModal);
