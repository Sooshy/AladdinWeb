import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { exportDialogToggle } from "../../redux/actions";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from "@material-ui/core";


class ExportDialog extends React.Component {
    render() {
        return <Dialog open={this.props.open} onClose={()=> this.props.exportDialogToggle()}>
            <DialogTitle>בחר אפשרות לייצוא:</DialogTitle>
            <Button variant="contained" color="primary">אקסל</Button>
            <Button variant="contained" color="primary">העתק</Button>
        </Dialog>
    };
};
const mapStateToProps = (state) => {
    return { open: state.exportMode.exportDialog, extensionsByWordToExport: state.exportMode.extensionsByWordToExport }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exportDialogToggle }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportDialog);