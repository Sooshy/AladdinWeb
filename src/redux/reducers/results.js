import { TOGGLE_WORD_VISIBILITY } from "../actionTypes.js";

const initialState = {
    searchResults: [{
        word: "תפוח",
        results: [{
            "מורפולוגיה": [
                "תפוחים",
                "עוד משהו"
            ]
        },
        {
            "נושאית": [
                "עץ"
            ]
        }
        ],
        isVisible: true
    },
    {
        word: "לימון",
        results: [{
            "מורפולוגיה": [
                "לימונים",
            ]
        }],
        isVisible: true
    },
    {
        word: "ביונסה",
        results: [{
            "נושאית": [
                "לימונדה",
            ]
        }],
        isVisible: true
    },
    {
        word: "למה",
        results: [],
        isVisible: true
    }]
}

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
        default:
            return state;
    };
};