import React, { Component } from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppNavbar from "./components/AppNavbar";
import Hero from "./components/Hero";

// TODO: handle state. Redux/hooks
// TODO: Change color scheme. Implement MUI Theming?
// TODO: Refactor and code split
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppNavbar />
          <Hero />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
