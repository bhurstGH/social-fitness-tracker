import React, { useState, createContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import AppNavbar from "./components/AppNavbar";
import MenuDrawer from "./components/MenuDrawer";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import { Drawer } from "@material-ui/core";

export const UserContext = createContext({});
export const DrawerContext = createContext({});
// TODO: handle state. Redux/hooks
// TODO: Change color scheme. Implement MUI Theming?
// TODO: Refactor and code split
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen }}>
            <div className="App">
              <AppNavbar />
              <MenuDrawer />
              {currentUser ? <Dashboard /> : <Hero />}
            </div>
          </DrawerContext.Provider>
        </UserContext.Provider>
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;
