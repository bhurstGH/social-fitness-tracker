import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Logout from "./Logout";

import { UserContext } from "../App";

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

  const { currentUser } = useContext(UserContext);

  // Has to appear above guest and loggedIn. Is not hoisted(?)
  const handleSnack = (message, variant) => {
    props.enqueueSnackbar(message, { variant });
  };

  const guest = (
    <React.Fragment>
      <RegisterModal snack={handleSnack} />
      <LoginModal snack={handleSnack} />
    </React.Fragment>
  );

  const loggedIn = (
    <React.Fragment>
      <Logout snack={handleSnack} />
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Material-UI relates h6 to their former title variant. Inherit color from the theme. .grow to push buttons to the far right. */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            SFTracker
          </Typography>
          {currentUser ? (
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {currentUser.username}
            </Typography>
          ) : null}

          {currentUser ? loggedIn : guest}
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppNavbar.protoTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const AppNavSnack = withSnackbar(AppNavbar);

// withStyles() HOC to inject styles/classes to props
export default withStyles(styles)(AppNavSnack);
