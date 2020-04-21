import React from 'react';
import SearchBar from './search/SearchBar';
import Grid from '@material-ui/core/Grid';
import SearchResults from './results/SearchResults';
import { ThemeProvider } from '@material-ui/core';
import theme from '../design/theme'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExportToggle from './export/ExportToggle';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  toolBarText: {
    fontFamily: [
      "Allura"
    ].join(","),
    margin: theme.spacing(1)
  },
  directionLtr: {
    direction: "ltr"
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar className={classes.directionLtr}>
          <Typography className={classes.toolBarText} variant="h1">
            Aladdin
          </Typography>
          <Typography className={classes.toolBarText} variant="h4">
            A whole new word....
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Grid container justify='center' spacing={5} alignItems="center">
          <Grid item xs={8}>
            <SearchBar></SearchBar>
          </Grid>
          <Grid item xs={8}>
            <SearchResults></SearchResults>
          </Grid>
        </Grid>
      </div>
      <ExportToggle></ExportToggle>
    </ThemeProvider>
  }
}

export default withStyles(styles)(App);
