import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { DrawerContext } from "../App";

const styles = {
  mr: {
    marginRight: "1rem"
  }
};

function MenuDrawerButton(props) {
  const { classes } = props;

  const { setDrawerIsOpen } = useContext(DrawerContext);

  return (
    <div>
      <IconButton
        className={classes.mr}
        color="inherit"
        onClick={() => setDrawerIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}

MenuDrawerButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuDrawerButton);
