import React from "react";
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { extensionColors, extensionTerms } from '../../design/viewSettings';
import WordExtension from "./WordExtension";

const styles = theme => ({
    marginTop: {
        marginTop: theme.spacing(2)
    },
    margin: {
        margin: theme.spacing(1)
    },
    extensionColor: {
        backgroundColor: (props) => extensionColors[Object.keys(props.extension)[0]]
    }
});

class WordExtensionRow extends React.Component {
    render() {
        const extensionType = Object.keys(this.props.extension)[0];
        const { classes } = this.props;

        return <Paper className={classes.marginTop} elevation={0}>
            <Chip className={classes.extensionColor} label={extensionTerms[extensionType]}></Chip>
            {this.props.extension[extensionType].map(word => <WordExtension wordToExtend={this.props.wordToExtend} word={word} extensionType={extensionType}></WordExtension>)}
        </Paper>
    }
}

export default withStyles(styles)(WordExtensionRow);