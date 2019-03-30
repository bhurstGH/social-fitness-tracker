import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { Typography, Grid, Button } from "@material-ui/core";

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

  const { currentUser } = useContext(UserContext);

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
              Welcome {currentUser.username}!
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
