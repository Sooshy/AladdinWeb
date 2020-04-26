import { EXPORT_MODE_ON, EXPORT_MODE_OFF, ADD_WORD_EXTENSIONS_TO_EXPORT, DELETE_WORD_EXTENSION_FROM_EXPORT, CANCEL_ALL_MARK_FOR_EXPORT, EXPORT_DIALOG_TOGGLE, SEARCH_WORDS_SUCCESS, SHOW_EXPORT_SUCCESS, ADD_EDITED_WORD_EXTENSION, REMOVE_EDITED_WORD_EXTENSION } from "../actionTypes";

const initialState = {
    exportMode: false,
    exportDialog: false,
    wordsToExport: [],
    showExportSuccess: false,
    editedWords: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EXPORT_MODE_ON:
            return {
                ...state, exportMode: true
            };
        case EXPORT_MODE_OFF:
            return {
                ...state, exportMode: false, wordsToExport: [], editedWords: []
            };
        case ADD_WORD_EXTENSIONS_TO_EXPORT:
            let newExtensionByWordToExport = [...state.wordsToExport];
            action.payload.words.forEach(word => {
                let editedWordAdd = getEditedWord(word, state.editedWords);
                newExtensionByWordToExport = newExtensionByWordToExport.filter(wordInfo => wordInfo.word !== word.word || wordInfo.wordExtension !== word.wordExtension || wordInfo.extensionType !== word.extensionType);
                newExtensionByWordToExport = [...newExtensionByWordToExport, { word: word.word, wordExtension: word.wordExtension, extensionType: word.extensionType, editedWord: editedWordAdd }]
            });
            return {
                ...state, wordsToExport: newExtensionByWordToExport
            };
        case DELETE_WORD_EXTENSION_FROM_EXPORT:
            return {
                ...state, wordsToExport: state.wordsToExport.filter(wordInfo => wordInfo.word !== action.payload.word.word || wordInfo.wordExtension !== action.payload.word.wordExtension || wordInfo.extensionType !== action.payload.word.extensionType)
            };
        case CANCEL_ALL_MARK_FOR_EXPORT:
            return {
                ...state, wordsToExport: []
            };
        case EXPORT_DIALOG_TOGGLE:
            return {
                ...state, exportDialog: !state.exportDialog
            };
        case SEARCH_WORDS_SUCCESS:
            return {
                ...state, wordsToExport: []
            };
        case SHOW_EXPORT_SUCCESS:
            return {
                ...state, showExportSuccess: action.payload.exportSuccessStatus
            };
        case ADD_EDITED_WORD_EXTENSION:
            let filtered = state.editedWords.filter(editedWord => editedWord.word !== action.payload.wordInfo.word || editedWord.wordExtension !== action.payload.wordInfo.wordExtension || editedWord.extensionType !== action.payload.wordInfo.extensionType || editedWord.editedWord !== action.payload.wordInfo.editedWord);
            let result = [...filtered, action.payload.wordInfo]
            return {
                ...state, editedWords: result
            };
        case REMOVE_EDITED_WORD_EXTENSION:
            return {
                ...state, editedWords: state.editedWords.filter(editedWord => editedWord.word !== action.payload.wordInfo.word || editedWord.wordExtension !== action.payload.wordInfo.wordExtension || editedWord.extensionType !== action.payload.wordInfo.extensionType || editedWord.editedWord !== action.payload.wordInfo.editedWord)
            };
        default:
            return state;
    };
};

const getEditedWord = (wordInfo, editedWords) => {
    let editedWordFiltered = editedWords.filter(editedWord => editedWord.word === wordInfo.word && editedWord.wordExtension === wordInfo.wordExtension && editedWord.extensionType === wordInfo.extensionType);
    if (editedWordFiltered.length === 1) {
        return editedWordFiltered[0].editedWord;
    }
    else {
        return null;
    }
};