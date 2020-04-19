import React from "react";
import WordResults from "./WordResults";
import { connect } from "react-redux";

class WordsResultsList extends React.Component {
    render() {
        return this.props.searchResults.map(wordInfo => wordInfo.isVisible ? <WordResults wordInfo={wordInfo}></WordResults> : null);
    };
};

const mapStateToProps = (state) => {
    return { searchResults: state.results.searchResults }
};

export default connect(mapStateToProps)(WordsResultsList);

