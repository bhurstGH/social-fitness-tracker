import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider
} from "@material-ui/core";
import { DrawerContext, PageContext } from "../App";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const styles = theme => ({
  drawer: {
    width: 240
  },
  drawerHeader: {
    display: "flex",
    padding: "1rem",
    justifyContent: "flex-end"
  },
  primary: {
    color: "blue",
    textTransform: "uppercase"
  }
});

function MenuDrawer(props) {
  const { classes } = props;

  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const setPageAndClose = page => {
    setCurrentPage(page);
    setDrawerIsOpen(false);
  };

  return (
    <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setDrawerIsOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.drawer}>
        <List>
          <ListItem button onClick={() => setPageAndClose("Account")}>
            <ListItemText
              inset={true}
              classes={{
                primary: currentPage === "Account" ? classes.primary : null
              }}
              primary="Account"
            />
          </ListItem>
          <ListItem button onClick={() => setPageAndClose("Routines")}>
            <ListItemText
              inset={true}
              classes={{
                primary: currentPage === "Routines" ? classes.primary : null
              }}
              primary="Routines"
            />
          </ListItem>
          <ListItem button onClick={() => setPageAndClose("Workouts")}>
            <ListItemText
              inset={true}
              classes={{
                primary: currentPage === "Workouts" ? classes.primary : null
              }}
              primary="Workouts"
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuDrawer);
