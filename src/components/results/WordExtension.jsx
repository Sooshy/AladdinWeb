import React from "react";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { extensionColors } from '../../design/viewSettings';
import { bindActionCreators } from "redux";
import { addWordExtensionsToExport, deleteWordExtensionFromExport, addEditedWordExtension, removeEditedWordExtension } from "../../redux/actions";
import { connect } from "react-redux";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
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
        this.state = { editMode: false, editValue: this.props.word };
    };

    getEditedWord = () => {
        let editedWordFiltered = this.props.editedWords.filter(editedWord => editedWord.word === this.props.wordToExtend && editedWord.wordExtension === this.props.word && editedWord.extensionType === this.props.extensionType);
        if (editedWordFiltered.length === 1) {
            return editedWordFiltered[0].editedWord;
        }
        else {
            return null;
        }
    };

    isWordMarkedForExport = (word) => {
        if (this.props.extensionsByWordToExport.hasOwnProperty(this.props.wordToExtend)) {
            if (this.props.extensionsByWordToExport[this.props.wordToExtend].hasOwnProperty(this.props.extensionType)) {
                return this.props.extensionsByWordToExport[this.props.wordToExtend][this.props.extensionType].includes(word);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        };
    };

    handleEditValueChange = (event) => {
        this.setState({ editValue: event.target.value })
    };

    handleSubmitEdit = () => {
        if (this.state.editValue !== this.props.word && this.state.editValue !== "") {
            this.props.addEditedWordExtension({ word: this.props.wordToExtend, wordExtension: this.props.word, extensionType: this.props.extensionType, editedWord: this.state.editValue });
        }
        else {
            this.setState({ editValue: this.props.word });
        }
    }
    render() {
        const { classes } = this.props;

        const editedWord = this.getEditedWord();
        const isWordEdited = editedWord !== null;

        const baseWordView = <Badge classes={{ badge: classes.extensionColor }} className={classes.margin} variant="dot"><Typography variant="subtitle1">{!isWordEdited ? this.props.word : editedWord}</Typography></Badge>;
        const editWordView = <TextField onChange={this.handleEditValueChange} className={classes.textArea} value={this.state.editValue} />

        if (!this.props.exportMode) {
            return baseWordView;
        };

        if (this.isWordMarkedForExport(isWordEdited ? editedWord : this.props.word)) {
            return <Chip onClick={() => this.props.deleteWordFromExport({ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word })} className={classes.margin} color="primary" label={baseWordView}></Chip>
        };

        if (this.state.editMode) {
            return <Chip deleteIcon={<DoneOutlinedIcon />} onDelete={() => { this.setState({ editMode: false }); this.handleSubmitEdit() }} className={`${classes.margin}`} label={editWordView}></Chip>
        };

        if (isWordEdited) {
            return <Chip deleteIcon={<UndoOutlinedIcon />} onDelete={() => { this.props.removeEditedWordExtension({ word: this.props.wordToExtend, wordExtension: this.props.word, extensionType: this.props.extensionType, editedWord: editedWord }); this.setState({ editValue: this.props.word }) }} onClick={() => this.props.addWordsToExport([{ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word }])} className={classes.margin} label={baseWordView}></Chip>
        }
        return <Chip deleteIcon={<EditOutlinedIcon />} onDelete={() => { this.setState({ editMode: true, editValue: isWordEdited ? editedWord : this.props.word }) }} onClick={() => this.props.addWordsToExport([{ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word }])} className={classes.margin} label={baseWordView}></Chip>
    }
}

const mapStateToProps = (state) => {
    return { exportMode: state.exportMode.exportMode, extensionsByWordToExport: state.exportMode.extensionsByWordToExport, editedWords: state.exportMode.editedWords }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addWordsToExport: addWordExtensionsToExport, deleteWordFromExport: deleteWordExtensionFromExport, addEditedWordExtension: addEditedWordExtension, removeEditedWordExtension: removeEditedWordExtension }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WordExtension));