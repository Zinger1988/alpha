import { combineReducers } from "redux";
import { windowsReducer } from "./windowsReducer";

export const rootReducer = combineReducers({
    windows: windowsReducer
})