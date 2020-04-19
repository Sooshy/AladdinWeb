import React from "react";
import { Paper } from "@material-ui/core";
import WordVisibility from "./WordVisibility";
import WordsResultsList from "./WordsResultsList";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    }
});

class SearchResults extends React.Component {
    render() {
        const { classes } = this.props;
        return <Paper className={classes.root}>
            <WordVisibility></WordVisibility>
            <WordsResultsList></WordsResultsList>
        </Paper>
    };
};

export default withStyles(styles)(SearchResults);

