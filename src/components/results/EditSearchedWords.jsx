import React from "react";
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { editSearchedWords } from '../../redux/actions';
import { connect } from "react-redux";

const styles = theme => ({
    margin: {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
});

class EditSearchedWords extends React.Component {
    render() {
        const { classes } = this.props;

        return this.props.exportMode===false ? <Button className={classes.margin} onClick={() => this.props.editSearchedWords(this.props.searchedWords)} variant="contained" color="secondary"><EditOutlinedIcon></EditOutlinedIcon></Button> : null;
    }
}

const mapStateToProps = (state) => {
    return { searchedWords: state.results.searchResults.map(result => result.word), exportMode: state.exportMode.exportMode }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ editSearchedWords }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditSearchedWords));