import React from "react";
import { Paper } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import WordVisibility from "./WordVisibility";
import WordsResultsList from "./WordsResultsList";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import EditSearchedWords from "./EditSearchedWords";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    },
    center:{
        placeContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
    }
});

class SearchResults extends React.Component {
    render() {
        const { classes } = this.props;
        const searchResultsView = <Paper className={classes.root}>
            <EditSearchedWords></EditSearchedWords>
            <WordVisibility></WordVisibility>
            <WordsResultsList></WordsResultsList>
        </Paper>;

        const loaderView = <Paper className={`${classes.root} ${classes.center}`}><CircularProgress></CircularProgress></Paper>

        return this.props.searchResults || this.props.isLoading ?
            this.props.isLoading ? loaderView : searchResultsView : null;
    };
};

const mapStateToProps = (state) => {
    return { searchResults: state.results.searchResults, isLoading: state.wordsSearch.isLoading }
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));

