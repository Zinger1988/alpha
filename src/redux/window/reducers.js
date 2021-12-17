import types from "./types";
import {combineReducers} from "redux";

const currentInitialState = {
    collection: [],
    focus: null,
}

const stashInitialState = {
    collection: [],
    focus: []
}

const currentReducer = (state = currentInitialState, action) => {
    switch (action.type) {

        case types.CREATE_WINDOW:
            return {...state, collection: [...state.collection, action.payload]}

        case types.FOCUS_WINDOW: {
            return {...state, focus: action.payload};
        }

        case types.CLOSE_WINDOW:
            return {...state, collection: state.collection.filter(item => item.id !== action.payload)}

        default:
            return state;
    }
}

const stashReducer = (state = stashInitialState, action) => {
    switch (action.type) {

        case types.STASH_FOCUS_ADD:
            return {...state, focus: [...state.focus, action.payload]}

        case types.STASH_FOCUS_REMOVE:
            const newFocus = state.focus.filter((item, i, arr) => arr.indexOf(item) === i && item !== action.payload)
            return {...state, focus: newFocus}

        case types.STASH_COLLECTION_ADD:
            return {...state, collection: [...state.collection, action.payload]}

        case types.STASH_COLLECTION_UPDATE:
            const index = state.collection.findIndex(item => item.id === action.payload.id)
            return {...state, collection: [...state.collection.slice(0, index), action.payload, ...state.collection.slice(index + 1)]}

        default:
            return state;
    }
}

const reducer = combineReducers({
    current: currentReducer,
    stash: stashReducer
})

export default reducer