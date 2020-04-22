import { EXPORT_MODE_ON, EXPORT_MODE_OFF, ADD_WORD_EXTENSIONS_TO_EXPORT, DELETE_WORD_EXTENSION_FROM_EXPORT, CANCEL_ALL_MARK_FOR_EXPORT, EXPORT_DIALOG_TOGGLE, SEARCH_WORDS_SUCCESS, SHOW_EXPORT_SUCCESS } from "../actionTypes";

const initialState = {
    exportMode: false,
    exportDialog: false,
    extensionsByWordToExport: {},
    showExportSuccess: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EXPORT_MODE_ON:
            return {
                ...state, exportMode: true
            };
        case EXPORT_MODE_OFF:
            return {
                ...state, exportMode: false, extensionsByWordToExport: {}
            };
        case ADD_WORD_EXTENSIONS_TO_EXPORT:
            let newExtensionByWordToExport = { ...state.extensionsByWordToExport };
            action.payload.words.forEach(word => {
                if (newExtensionByWordToExport.hasOwnProperty(word.word)) {
                    if (newExtensionByWordToExport[word.word].hasOwnProperty(word.extensionType)) {
                        if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                            newExtensionByWordToExport[word.word][word.extensionType].push(word.wordExtension);
                        };
                    }
                    else {
                        newExtensionByWordToExport[word.word][word.extensionType] = [];
                        if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                            newExtensionByWordToExport[word.word][word.extensionType].push(word.wordExtension);
                        };
                    }
                }
                else {
                    newExtensionByWordToExport[word.word] = {};
                    newExtensionByWordToExport[word.word][word.extensionType] = [];
                    if (!newExtensionByWordToExport[word.word][word.extensionType].includes(word.wordExtension)) {
                        newExtensionByWordToExport[word.word][word.extensionType].push(word.wordExtension);
                    };
                }
            });
            return {
                ...state, extensionsByWordToExport: newExtensionByWordToExport
            };
        case DELETE_WORD_EXTENSION_FROM_EXPORT:
            let newExtensionByWordToExportToDelete = { ...state.extensionsByWordToExport };
            newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType] =
                newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType]
                    .filter(extension => extension !== action.payload.word.wordExtension);
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
        default:
            return state;
    };
};