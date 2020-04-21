import { combineReducers } from "redux";
import wordsSearch from "./wordsSearch.js";
import results from "./results.js";
import exportMode from "./exportMode";

export default combineReducers({ wordsSearch, exportMode, results });