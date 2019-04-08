import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
// import { withSnackbar } from "notistack";
import AddRoutine from "./AddRoutine";
import RoutineList from "./RoutineList";

import { UserContext } from "../App";
import { RoutineContext } from "./Dashboard";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column"
  }
});

function RoutinePage(props) {
  const { classes } = props;
  const { currentUser } = useContext(UserContext);
  const { routines, setRoutines } = useContext(RoutineContext);

  useEffect(() => {
    axios
      .get(`/routines/${currentUser.id}`)
      .then(res => {
        setRoutines(res.data);
      })
      .catch(err => console.log(err.response));
  }, [routines]);

  return (
    <div className={classes.root}>
      <AddRoutine />
      <RoutineList />
    </div>
  );
}

RoutinePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoutinePage);
