import { combineReducers } from "redux";
import { default as windowsReducer} from "./window/index";

export const rootReducer = combineReducers({
    windows: windowsReducer,
})