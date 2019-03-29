import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Modal, Button, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

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
  const { classes } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button color="inherit" onClick={() => setIsOpen(true)}>
        {/* Nudge icon away from text */}
        Login <AccountCircle className={classes.ml} />
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classes.modal}>
          <form action="/users/login" method="post">
            <TextField
              autoFocus="true"
              id="email"
              name="email"
              label="Email"
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginModal);
