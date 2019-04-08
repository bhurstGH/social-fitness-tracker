import React, { useContext } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

import { RoutineContext } from "./Dashboard";

function RoutineList(props) {
  const { routines } = useContext(RoutineContext);

  return (
    <div>
      <Typography>Placeholder list Component</Typography>
      <List>
        {routines.map(routine => (
          <ListItem key={routine._id}>
            <ListItemText
              primary={routine.name}
              secondary={
                routine.description
                  ? `${routine.description.substring(0, 25)}...`
                  : null
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RoutineList;
