import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Paper,
  TextField,
  Select,
  Input,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  form: {
    display: "flex",
    flexFlow: "column wrap",
    padding: theme.spacing.unit
  },
  routineField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  displayButton: {
    alignSelf: "flex-end"
  }
});

function AddRoutine(props) {
  const { classes } = props;

  const [inputs, setInputs] = useState({ routineExercises: [] });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("/exercises")
      .then(res => {
        setExercises(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const submitRoutine = () => {
    console.log(inputs);
    axios
      .post("/routines", inputs)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.form}>
        <TextField
          className={classes.routineField}
          required
          id="routine-name"
          name="routineName"
          label="Routine Name"
          onChange={handleChange}
        />

        <FormControl className={classes.routineField}>
          <InputLabel htmlFor="select-exercises">Exercises</InputLabel>
          <Select
            multiple
            value={inputs.routineExercises}
            name="routineExercises"
            input={<Input id="select-exercises" />}
            renderValue={selected => selected.length}
            onChange={handleChange}
          >
            {exercises.map(exercise => (
              <MenuItem key={exercise.name} value={exercise.name}>
                <Checkbox
                  checked={inputs.routineExercises.indexOf(exercise.name) > -1}
                />
                <ListItemText primary={exercise.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.routineField}
          id="routine-description"
          name="routineDescription"
          label="Description"
          multiline
          rows="4"
          onChange={handleChange}
        />
      </Paper>
      <Button
        className={classes.displayButton}
        color="primary"
        onClick={submitRoutine}
      >
        Add Routine
      </Button>
    </div>
  );
}

AddRoutine.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddRoutine);
