import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { exportDialogToggle, showExportSuccess } from "../../redux/actions";
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Typography } from "@material-ui/core";
import CopyButton from "./CopyButton";

const styles = theme => ({
    title: {
        padding: theme.spacing(6)
    },
    center: {
        placeContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
    },
    button: {
        margin: theme.spacing(2)
    }
});

class ExportDialog extends React.Component {
    onClose = () => {
        this.props.showExportSuccess(false);
        this.props.exportDialogToggle();
    };

    render() {
        const { classes } = this.props;
        const successMessage = this.props.showExportSuccessStatus ? <div className={classes.center}>
            <Typography variant="subtitle1">המילים ייוצאו בהצלחה!</Typography>
        </div> : null;
        return <Dialog open={this.props.open} onClose={() => this.onClose()}>
            <DialogTitle className={classes.title}>בחר אפשרות לייצוא:</DialogTitle>
            <div className={classes.center}>
                <Button className={classes.button} variant="contained" color="primary">אקסל</Button>
                <CopyButton></CopyButton>
            </div>
            {successMessage}
        </Dialog>
    };
};
const mapStateToProps = (state) => {
    return { open: state.exportMode.exportDialog, showExportSuccessStatus: state.exportMode.showExportSuccess, extensionsByWordToExport: state.exportMode.extensionsByWordToExport }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exportDialogToggle, showExportSuccess }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExportDialog));