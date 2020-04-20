import React from "react";
import { Paper, Typography } from "@material-ui/core";
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
    center: {
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
        const errorView = <Paper className={`${classes.root} ${classes.center}`}><Typography variant="h3" color="error">חלה שגיאה, נסו שנית</Typography></Paper>

        if (this.props.isLoading) {
            return loaderView;
        }

        if (this.props.error !== null && !this.props.isLoading) {
            return errorView;
        }

        return this.props.searchResults ? searchResultsView : null;
    };
};

const mapStateToProps = (state) => {
    return { searchResults: state.results.searchResults, isLoading: state.wordsSearch.isLoading, error: state.wordsSearch.error }
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));

