import axios from "axios";

const searchApi = process.env.REACT_APP_SEARCH_API;
export const getSearchResults = words => {
    return axios.post(searchApi, words);
}