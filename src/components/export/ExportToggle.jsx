import React from 'react';
import Fab from '@material-ui/core/Fab';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { exportModeOn, exportModeOff } from '../../redux/actions';

const styles = theme => ({
    stick: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
    fab: {
        margin: theme.spacing(1)
    }
});

class ExportToggle extends React.Component {
    render() {
        const { classes } = this.props;
        if (this.props.searchResults === null) {
            return null;
        }
        return this.props.exportMode ? <div className={classes.stick}><Tooltip title="בחר אפשרות לייצוא">
            <Fab className={classes.fab} color="primary"  >
                <DoneOutlinedIcon></DoneOutlinedIcon>
            </Fab>
        </Tooltip>
            <Tooltip title="בטל">
                <Fab size="small" onClick={() => this.props.exportModeOff()} className={classes.fab}>
                    <ClearOutlinedIcon></ClearOutlinedIcon>
                </Fab>
            </Tooltip></div>
            : <div className={classes.stick}><Tooltip title="יצוא">
                <Fab onClick={() => this.props.exportModeOn()} className={classes.fab} color="secondary"  >
                    <SendOutlinedIcon></SendOutlinedIcon>
                </Fab>
            </Tooltip>
            </div>
    };
}

const mapStateToProps = (state) => {
    return { exportMode: state.exportMode.exportMode, searchResults: state.results.searchResults }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exportModeOn, exportModeOff }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExportToggle));