import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { DrawerContext } from "../App";

const styles = {
  drawer: {
    width: 240
  }
};

function MenuDrawer(props) {
  const { classes } = props;

  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);

  return (
    <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
      <div className={classes.drawer}>
        <List>
          <ListItem>
            <ListItemText primary="Test" />
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
