import React, { Component } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppNavbar from "./components/AppNavbar";

// TODO: handle state. Redux/hooks
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppNavbar />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
