import React, { Component } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Button variant="contained" color="primary">
            SFTracker
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
