import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

// Define Material-UI styles to inject with withStyles()
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  ml: {
    marginLeft: "0.25rem"
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
          <Button color="inherit">
            {/* Nudge icon away from text */}
            Login <AccountCircle className={classes.ml} />
          </Button>
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
