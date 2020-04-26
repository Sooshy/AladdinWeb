import React from "react";
import { connect } from "react-redux";
import { showExportSuccess } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import copy from 'copy-to-clipboard';

const styles = theme => ({
    button: {
        margin: theme.spacing(2)
    }
});

class CopyButton extends React.Component {

    stringToCopy = () => {
        let wordsToString = this.props.wordsToExport.map(wordInfo => wordInfo.editedWord ? wordInfo.editedWord : wordInfo.wordExtension );
        return wordsToString.join(',');
    };

    copyToClipboard = () => {
        if (copy(this.stringToCopy())) {
            this.props.showExportSuccess(true);
        };
    };

    render() {
        const { classes } = this.props;

        return <Button onClick={() => this.copyToClipboard()} className={classes.button} variant="contained" color="primary">העתק</Button>;
    };
};

const mapStateToProps = (state) => {
    return { wordsToExport: state.exportMode.wordsToExport }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showExportSuccess }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CopyButton));