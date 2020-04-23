import React from "react";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { extensionColors } from '../../design/viewSettings';
import { bindActionCreators } from "redux";
import { addWordExtensionsToExport, deleteWordExtensionFromExport } from "../../redux/actions";
import { connect } from "react-redux";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    margin: {
        margin: theme.spacing(1)
    },
    extensionColor: {
        backgroundColor: (props) => extensionColors[props.extensionType]
    },
    textArea: {
        width: theme.spacing(10)
    }
});

class WordExtension extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editMode: false };
    };

    isWordMarkedForExport = () => {
        if (this.props.extensionsByWordToExport.hasOwnProperty(this.props.wordToExtend)) {
            if (this.props.extensionsByWordToExport[this.props.wordToExtend].hasOwnProperty(this.props.extensionType)) {
                return this.props.extensionsByWordToExport[this.props.wordToExtend][this.props.extensionType].includes(this.props.word);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        };
    };

    render() {
        const { classes } = this.props;

        const baseWordView = <Badge classes={{ badge: classes.extensionColor }} className={classes.margin} variant="dot"><Typography variant="subtitle1">{this.props.word}</Typography></Badge>;
        const editWordView = <TextField  className={classes.textArea} defaultValue={this.props.word} />
        if (!this.props.exportMode) {
            return baseWordView;
        };

        if (this.isWordMarkedForExport()) {
            return <Chip onClick={() => this.props.deleteWordFromExport({ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word })} className={classes.margin} color="primary" label={baseWordView}></Chip>
        };

        if (this.state.editMode) {
            return <Chip deleteIcon={<DoneOutlinedIcon />} onDelete={() => { this.setState({ editMode: false }) }} className={`${classes.margin}`} label={editWordView}></Chip>
        };

        return <Chip deleteIcon={<EditOutlinedIcon />} onDelete={() => { this.setState({ editMode: true }) }} onClick={() => this.props.addWordsToExport([{ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word }])} className={classes.margin} label={baseWordView}></Chip>
    }
}

const mapStateToProps = (state) => {
    return { exportMode: state.exportMode.exportMode, extensionsByWordToExport: state.exportMode.extensionsByWordToExport }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addWordsToExport: addWordExtensionsToExport, deleteWordFromExport: deleteWordExtensionFromExport }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WordExtension));