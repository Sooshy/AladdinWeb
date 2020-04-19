import { combineReducers } from "redux";
import wordsSearch from "./wordsSearch.js";
import results from "./results.js";


export default combineReducers({ wordsSearch, results });