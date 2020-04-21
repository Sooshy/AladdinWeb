import { EXPORT_MODE_ON, EXPORT_MODE_OFF, ADD_WORDS_TO_EXPORT, DELETE_WORD_FROM_EXPORT } from "../actionTypes";

const initialState = {
    exportMode: false,
    extensionsByWordToExport: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EXPORT_MODE_ON:
            return {
                ...state, exportMode: true
            };
        case EXPORT_MODE_OFF:
            return {
                ...state, exportMode: false
            };
        case ADD_WORDS_TO_EXPORT:
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
        case DELETE_WORD_FROM_EXPORT:
            let newExtensionByWordToExportToDelete = { ...state.extensionsByWordToExport };
            newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType] =
            newExtensionByWordToExportToDelete[action.payload.word.word][action.payload.word.extensionType]
                    .filter(extension => extension !== action.payload.word.wordExtension);
            return {
                ...state, extensionsByWordToExport: newExtensionByWordToExportToDelete
            };
        default:
            return state;
    };
};