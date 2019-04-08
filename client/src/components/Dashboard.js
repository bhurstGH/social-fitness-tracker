import React, { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { withSnackbar } from "notistack";
import { Typography, Grid, Divider } from "@material-ui/core";
import AccountPage from "./AccountPage";
import RoutinePage from "./RoutinePage";
import WorkoutsPage from "./WorkoutsPage";

import { PageContext } from "../App";

export const RoutineContext = createContext();

const styles = theme => ({
  root: {
    display: "flex",
    width: "auto"
  },
  content: {
    padding: "2rem",
    width: "100%"
  }
});

function Dashboard(props) {
  const { classes } = props;

  const { currentPage } = useContext(PageContext);
  const [routines, setRoutines] = useState([]);

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
    <RoutineContext.Provider value={{ routines, setRoutines }}>
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
    </RoutineContext.Provider>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
