import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Modal, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const styles = theme => ({
  modal: {
    position: "absolute",
    width: "40%",
    backgroundColor: "#fff",
    padding: "2rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  ml: {
    marginLeft: "0.25rem"
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
          <Typography>Test</Typography>
        </div>
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginModal);
