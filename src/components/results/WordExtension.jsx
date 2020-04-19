import React from "react";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    marginTop: {
        marginTop: theme.spacing(2)
    },
    margin: {
        margin: theme.spacing(1)
    }
});

class WordExtension extends React.Component {
    render() {
        const { classes } = this.props;
        const key = Object.keys(this.props.extension)[0];
        return <Paper className={classes.marginTop} elevation={0}>
            <Chip label={key}></Chip>
            { this.props.extension[key].map(word => <Badge className={classes.margin} color="secondary" variant="dot"><Typography variant="subtitle1">{word}</Typography></Badge>)}
        </Paper>
    }
}

export default withStyles(styles)(WordExtension);