import React from "react";
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import { Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { extensionColors } from '../../design/viewSettings';
import { bindActionCreators } from "redux";
import { addWordsToExport, deleteWordFromExport } from "../../redux/actions";
import { connect } from "react-redux";


const styles = theme => ({
    margin: {
        margin: theme.spacing(1)
    },
    extensionColor: {
        backgroundColor: (props) => extensionColors[props.extensionType]
    }
});

class WordExtension extends React.Component {

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

        if (!this.props.exportMode) {
            return baseWordView;
        }

        if (this.isWordMarkedForExport()) {
            return <Chip onClick={() => this.props.deleteWordFromExport({ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word })} className={classes.margin} color="primary" label={baseWordView}></Chip>
        }

        return <Chip onClick={() => this.props.addWordsToExport([{ word: this.props.wordToExtend, extensionType: this.props.extensionType, wordExtension: this.props.word }])} className={classes.margin} label={baseWordView}></Chip>
    }
}

const mapStateToProps = (state) => {
    return { exportMode: state.exportMode.exportMode, extensionsByWordToExport: state.exportMode.extensionsByWordToExport }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addWordsToExport, deleteWordFromExport }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WordExtension));