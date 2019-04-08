import React, { useState, useEffect, useContext } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";

import { UserContext } from "../App";

function RoutineList() {
  const { currentUser } = useContext(UserContext);

  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    axios
      .get(`/routines/${currentUser.id}`)
      .then(res => {
        setRoutines(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <div>
      <Typography>Placeholder list Component</Typography>
      <List>
        {routines.map(routine => (
          <ListItem key={routine._id}>
            <ListItemText
              primary={routine.name}
              secondary={routine.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RoutineList;
