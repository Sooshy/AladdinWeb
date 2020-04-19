import React from "react";
import ChipInput from 'material-ui-chip-input';
import { bindActionCreators } from "redux";
import { addWordToSearch, deleteWordFromSearch } from "../../redux/actions";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: theme.spacing(0.5),
        width:"80%"
        }
});

class SearchText extends React.Component {
    render() {
        const { classes } = this.props;
        return <ChipInput className={classes.root}
            value={this.props.wordsToSearch} helperText="הכניסו מילה ולחצו על Enter" onAdd={chip => this.props.addWordToSearch(chip)} onDelete={(chip => this.props.deleteWordFromSearch(chip))}
        />
    };
};
//todo: add validation
const mapStateToProps = (state) => {
    return { wordsToSearch: state.wordsSearch.wordsToSearch }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addWordToSearch, deleteWordFromSearch }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchText));