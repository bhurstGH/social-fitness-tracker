import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { withSnackbar } from "notistack";
import { Typography, Grid, Divider } from "@material-ui/core";
import AccountPage from "./AccountPage";
import RoutinePage from "./RoutinePage";
import WorkoutsPage from "./WorkoutsPage";

import { PageContext } from "../App";

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

  const { currentPage } = useContext(PageContext);

  const page = () => {
    switch (currentPage) {
      case "Routines":
        return <RoutinePage />;
      case "Workouts":
        return <WorkoutsPage />;
      default:
        return <AccountPage />;
    }
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
              {currentPage}
              <Divider variant="fullWidth" />
            </Typography>
            {page()}
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
