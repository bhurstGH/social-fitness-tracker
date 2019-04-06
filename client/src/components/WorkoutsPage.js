import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { withSnackbar } from "notistack";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import { UserContext } from "../App";

const styles = theme => ({
  content: {
    padding: "2rem"
  }
});

function WorkoutsPage(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const changeUsername = () => {
    axios
      .post(`/users/${currentUser.id}/update`, {
        username: document.getElementById("username").value
      })
      .then(res => {
        setIsOpen(false);
        console.log(res.data.username);
        setCurrentUser({
          ...currentUser,
          username: res.data.username
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        onClick={() => setIsOpen(true)}
        disabled
      >
        Add Workout
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Change Username</DialogTitle>
        <DialogContent>
          <TextField
            id="username"
            name="username"
            label="Username"
            defaultValue={currentUser.username}
            fullWidth
            required
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={changeUsername} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

WorkoutsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WorkoutsPage);
