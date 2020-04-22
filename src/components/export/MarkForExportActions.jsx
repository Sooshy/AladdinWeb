import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Paper } from '@material-ui/core';
import { cancelAllMarkForExport, addWordExtensionsToExport } from "../../redux/actions";

const styles = theme => ({
    root: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        textAlign: "center",
        padding: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(2)
    }
});

class MarkForExportActions extends React.Component {
    markAllWordsForExport = () => {
        let wordsForExport = [];
        this.props.searchResults
            .forEach(result => result.results
                .forEach(extension => extension[Object.keys(extension)[0]]
                    .forEach(extensionWord => { wordsForExport.push({ word: result.word, extensionType: Object.keys(extension)[0], wordExtension: extensionWord }) })));
        this.props.addWordExtensionsToExport(wordsForExport);
    }

    render() {
        const { classes } = this.props;

        return this.props.exportMode ? <Paper variant="outlined" className={classes.root}>
            <Button onClick={() => this.markAllWordsForExport()} className={classes.button} variant="contained" color="secondary">בחר הכל</Button>
            <Button onClick={() => this.props.cancelAllMarkForExport()} className={classes.button} variant="contained" color="secondary">בטל בחירה</Button>
        </Paper> : null
    }
}

const mapStateToProps = (state) => {
    return { exportMode: state.exportMode.exportMode, searchResults: state.results.searchResults }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ cancelAllMarkForExport, addWordExtensionsToExport }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MarkForExportActions));