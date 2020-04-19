import { searchWordsBegin, searchWordsFaliure, searchWordsSuccess } from './actions';
import { getSearchResults } from "../api/searchApi";
import uuid from 'react-uuid';

export const getSearchResultsAction = (words) => {
    return dispatch => {
        dispatch(searchWordsBegin());
        getSearchResults(words)
            .then(res => dispatch(searchWordsSuccess(dataToResults(res.data))))
            .catch(error => dispatch(searchWordsFaliure(error)));
    }
}

const dataToResults = (data) => {
    return data.map(result => {
        return {
            word: result.word,
            isVisible: true,
            results: Object.keys(result.results).map(key => {
                return { [key]: result.results[key] }
            }),
            key: uuid()
        }
    })
};