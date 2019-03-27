import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import LoginModal from "./LoginModal";

// Define Material-UI styles to inject with withStyles()
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

function AppNavbar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Material-UI relates h6 to their former title variant. Inherit color from the theme. .grow to push buttons to the far right. */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SFTracker
          </Typography>

          {/* TODO: extract User registration and login button to another component */}
          <Button color="inherit">Register</Button>
          <LoginModal />
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppNavbar.protoTypes = {
  classes: PropTypes.object.isRequired
};

// withStyles() HOC to inject styles/classes to props
export default withStyles(styles)(AppNavbar);
