import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleWordVisibility } from "../../redux/actions.js"
import Chip from '@material-ui/core/Chip';

class WordVisibility extends React.Component {
    render() {
        const wordChips = this.props.searchResults.map(word => <Chip color={word.isVisible ? "primary" : "default"} onClick={() => this.props.toggleWordVisibility(word.word)} clickable={true} label={word.word} />);
        return this.props.exportMode === false ? wordChips : null;
    };
};

const mapStateToProps = (state) => {
    return { searchResults: state.results.searchResults, exportMode: state.exportMode.exportMode }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ toggleWordVisibility }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(WordVisibility);