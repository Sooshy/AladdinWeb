import React from "react";
import { connect } from "react-redux";
import { showExportSuccess } from "../../redux/actions";
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { CSVLink } from "react-csv";

const styles = theme => ({
    button: {
        margin: theme.spacing(2)
    }
});

class CsvButton extends React.Component {
    downloadCsv = () => {
        this.csvLink.link.click();
        this.props.showExportSuccess(true);
    };

    render() {
        const { classes } = this.props;

        return <div><Button onClick={() => this.downloadCsv()} className={classes.button} variant="contained" color="primary">CSV</Button><CSVLink data={this.props.wordsToExport} filename="extensions.csv" target="_blank" ref={r => this.csvLink = r}></CSVLink></div>;
    };
};

const mapStateToProps = (state) => {
    return { wordsToExport: state.exportMode.wordsToExport }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showExportSuccess }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CsvButton));