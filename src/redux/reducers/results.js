import { TOGGLE_WORD_VISIBILITY, SEARCH_WORDS_SUCCESS, SEARCH_WORDS_FALIURE } from "../actionTypes.js";

const initialState = {
    searchResults: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_WORD_VISIBILITY:
            let result = {
                ...state, searchResults: state.searchResults.map(word => {
                    if (word.word !== action.payload.word) {
                        return word;
                    };
                    return {
                        ...word,
                        isVisible: !word.isVisible
                    };
                })
            };
            return result;
        case SEARCH_WORDS_SUCCESS:
            return { ...state, searchResults: action.payload.results };
        case SEARCH_WORDS_FALIURE:
            return { ...state, searchResults: [] }
        default:
            return state;
    };
};