import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import WordExtension from "./WordExtension";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    }
});
class WordResults extends React.Component {
    render() {
        const { classes } = this.props;

        return <Paper variant="outlined" className={classes.root}>
            <Typography variant="h4">{this.props.wordInfo.word}</Typography>
            {this.props.wordInfo.results.length !== 0 ? this.props.wordInfo.results.map(extension => <WordExtension extension={extension}></WordExtension>) : <Typography variant="h6" color="error">אין תוצאות</Typography>}
        </Paper>
    }
}

export default withStyles(styles)(WordResults);