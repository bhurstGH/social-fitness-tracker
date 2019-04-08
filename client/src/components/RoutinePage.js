import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import { withSnackbar } from "notistack";
import AddRoutine from "./AddRoutine";
import RoutineList from "./RoutineList";

import { UserContext } from "../App";

const styles = theme => ({
  content: {
    padding: "2rem"
  }
});

function RoutinePage(props) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <AddRoutine />
      <RoutineList />
    </div>
  );
}

RoutinePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoutinePage);
