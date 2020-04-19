import React from "react";
import SearchText from "./SearchText";
import SearchButton from "./SearchButton";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(5),
        placeContent: 'center',
    }
});

class SearchBar extends React.Component {
    render() {
        const { classes } = this.props;
        return <Paper className={classes.root}>
            <SearchText></SearchText>
            <SearchButton></SearchButton>
        </Paper>
    }
}

export default withStyles(styles)(SearchBar);