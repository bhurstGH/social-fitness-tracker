import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";

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
  const { classes } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        Register
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modal}>
          <form action="/users" method="post">
            <TextField
              id="username"
              name="username"
              label="Username"
              fullWidth
              autoFocus="true"
            />
            <TextField id="email" name="email" label="Email" fullWidth />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
            />
            <TextField
              id="confirmpass"
              name="confirmpass"
              label="Confirm Password"
              fullWidth
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterModal);
