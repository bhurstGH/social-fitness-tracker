import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import heroImg from "../images/heroimg1.jpg";
import heroImg2 from "../images/heroimg2.jpeg";

// TODO: Deal with image sizes and responsiveness
// TODO: MUI break points
// TODO: List more planned features, perhaps on cards.
// TODO: More images
// TODO: Footer if/when appropriate

// Styles
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heroPaper: {
    width: "auto",
    height: 600,
    maxHeight: "100%",
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "top right"
  },
  heroPaperContent: {
    padding: "2rem",
    color: theme.palette.common.white,
    width: "70%",
    // TODO: Deal with contrast against image on smaller screens
    mixBlendMode: "difference"
  }
});

function Hero(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.heroPaper}>
        <Grid container>
          <Grid item>
            <div className={classes.heroPaperContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Welcome to SFT!
              </Typography>
              <Typography variant="h6" color="inherit">
                Track your workouts and share with the community.
              </Typography>
              <Typography variant="body2" color="inherit" paragraph>
                Or don't! It's entirely up to you. Keep track of your progress
                in private or choose what you share with the community. Trade
              </Typography>
              <Typography variant="body2" color="inherit" paragraph>
                routines, recieve advice, and motivate others! Maybe even find
                the elusive gym buddy. But we won't blame you if you just want
                to keep the proverbial headphones on. {`:)`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Register now
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

Hero.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);