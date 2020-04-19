import { ADD_WORD_TO_SEARCH, DELETE_WORD_FROM_SEARCH, TOGGLE_WORD_VISIBILITY } from "./actionTypes.js";

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