import React, { useState, createContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import AppNavbar from "./components/AppNavbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";

export const UserContext = createContext({});
// TODO: handle state. Redux/hooks
// TODO: Change color scheme. Implement MUI Theming?
// TODO: Refactor and code split
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <React.Fragment>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <AppNavbar />
            {currentUser ? <Dashboard /> : <Hero />}
          </div>
        </UserContext.Provider>
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;
