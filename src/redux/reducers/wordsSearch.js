import { ADD_WORD_TO_SEARCH, DELETE_WORD_FROM_SEARCH} from "../actionTypes.js";

const initialState = {
    wordsToSearch: [],
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_WORD_TO_SEARCH:
            return {
                ...state, wordsToSearch: [...state.wordsToSearch, action.payload.word]
            };
        case DELETE_WORD_FROM_SEARCH:
            return {
                ...state, wordsToSearch: state.wordsToSearch.filter(wordInSearch => wordInSearch !== action.payload.word)
            };
        default:
            return state;
    }
}