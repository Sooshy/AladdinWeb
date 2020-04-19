import { ADD_WORD_TO_SEARCH, DELETE_WORD_FROM_SEARCH, SEARCH_WORDS_FALIURE, SEARCH_WORDS_BEGIN, SEARCH_WORDS_SUCCESS, EDIT_SEARCHED_WORDS } from "../actionTypes.js";

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
        case SEARCH_WORDS_BEGIN:
            return {
                ...state, isLoading: true
            };
        case SEARCH_WORDS_FALIURE:
            return {
                ...state, error: action.payload.error
            };
        case SEARCH_WORDS_SUCCESS:
            return {
                ...state, isLoading: false, wordsToSearch: []
            };
        case EDIT_SEARCHED_WORDS:
            return{
                ...state, wordsToSearch: action.payload.searchedWords
            }
        default:
            return state;
    }
}