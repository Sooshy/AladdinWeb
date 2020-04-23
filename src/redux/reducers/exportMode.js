import { EXPORT_MODE_ON, EXPORT_MODE_OFF, ADD_WORD_EXTENSIONS_TO_EXPORT, DELETE_WORD_EXTENSION_FROM_EXPORT, CANCEL_ALL_MARK_FOR_EXPORT, EXPORT_DIALOG_TOGGLE, SEARCH_WORDS_SUCCESS, SHOW_EXPORT_SUCCESS, ADD_EDITED_WORD_EXTENSION, REMOVE_EDITED_WORD_EXTENSION } from "../actionTypes";

const initialState = {
    exportMode: false,
    exportDialog: false,
    extensionsByWordToExport: {},
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
                ...state, exportMode: false, extensionsByWordToExport: {}, editedWords: []
            };
        case ADD_WORD_EXTENSIONS_TO_EXPORT:
            let newExtensionByWordToExport = { ...state.extensionsByWordToExport };
            action.payload.words.forEach(word => {
                let editedWordAdd = getEditedWord(word, state.editedWords);
                if (newExtensionByWordToExport.hasOwnProperty(word.word)) {
                    if (newExtensionByWordToExport[word.word].hasOwnProperty(word.extensionType)) {
                        if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                            newExtensionByWordToExport[word.word][word.extensionType].push(editedWordAdd ? editedWordAdd : word.wordExtension);
                        };
                    }
                    else {
                        newExtensionByWordToExport[word.word][word.extensionType] = [];
                        if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                            newExtensionByWordToExport[word.word][word.extensionType].push(editedWordAdd ? editedWordAdd : word.wordExtension);
                        };
                    }
                }
                else {
                    newExtensionByWordToExport[word.word] = {};
                    newExtensionByWordToExport[word.word][word.extensionType] = [];
                    if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                        newExtensionByWordToExport[word.word][word.extensionType].push(editedWordAdd ? editedWordAdd : word.wordExtension);
                    };
                }
            });
            return {
                ...state, extensionsByWordToExport: newExtensionByWordToExport
            };
        case DELETE_WORD_EXTENSION_FROM_EXPORT:
            let newExtensionByWordToExportToDelete = { ...state.extensionsByWordToExport };
            let editedWordDelete = getEditedWord(action.payload.word, state.editedWords);
            let wordToDelete = editedWordDelete ? editedWordDelete : action.payload.word.wordExtension;
            newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType] =
                newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType]
                    .filter(extension => extension !== wordToDelete);
            return {
                ...state, extensionsByWordToExport: newExtensionByWordToExportToDelete
            };
        case CANCEL_ALL_MARK_FOR_EXPORT:
            return {
                ...state, extensionsByWordToExport: {}
            };
        case EXPORT_DIALOG_TOGGLE:
            return {
                ...state, exportDialog: !state.exportDialog
            };
        case SEARCH_WORDS_SUCCESS:
            return {
                ...state, extensionsByWordToExport: {}
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