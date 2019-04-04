import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import axios from "axios";
import {
  TextField,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import { UserContext } from "../App";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  content: {
    padding: "2rem"
  }
});

function Dashboard(props) {
  const { classes } = props;

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
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <div className={classes.content}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {currentUser.username}
            </Typography>
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => setIsOpen(true)}
              >
                Change Username
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
