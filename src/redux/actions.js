import { ADD_WORD_TO_SEARCH, DELETE_WORD_FROM_SEARCH, TOGGLE_WORD_VISIBILITY, SEARCH_WORDS_BEGIN, SEARCH_WORDS_SUCCESS, SEARCH_WORDS_FALIURE } from "./actionTypes.js";

export const addWordToSearch = word => ({
    type: ADD_WORD_TO_SEARCH,
    payload: {
        word
    }
});

export const deleteWordFromSearch = word => ({
    type: DELETE_WORD_FROM_SEARCH,
    payload: {
        word
    }
});

export const toggleWordVisibility = word => ({
    type: TOGGLE_WORD_VISIBILITY,
    payload: {
        word
    }
});

export const searchWordsBegin = () => ({
    type: SEARCH_WORDS_BEGIN
});

export const searchWordsSuccess = results => ({
    type: SEARCH_WORDS_SUCCESS,
    payload: {
        results
    }
});

export const searchWordsFaliure = error => ({
    type: SEARCH_WORDS_FALIURE,
    payload: {
        error
    }
});