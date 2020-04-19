import React from "react";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { extensionColors, extensionTerms } from '../../design/viewSettings';

const styles = theme => ({
    marginTop: {
        marginTop: theme.spacing(2)
    },
    margin: {
        margin: theme.spacing(1)
    },
    extensionColor:{
        backgroundColor: (props)=> extensionColors[Object.keys(props.extension)[0]]
    }
});

class WordExtension extends React.Component {
    render() {
        const extensionType = Object.keys(this.props.extension)[0];
        const { classes } = this.props;

        return <Paper className={classes.marginTop} elevation={0}>
            <Chip className={classes.extensionColor} label={extensionTerms[extensionType]}></Chip>
            {this.props.extension[extensionType].map(word => <Badge classes={{badge: classes.extensionColor}} className={classes.margin} color="secondary" variant="dot"><Typography variant="subtitle1">{word}</Typography></Badge>)}
        </Paper>
    }
}

export default withStyles(styles)(WordExtension);