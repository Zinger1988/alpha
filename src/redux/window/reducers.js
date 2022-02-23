import types from "./types";

const initialState = {
    collection: [],
    currentFocus: null,
    focusHistory: [],
    stash: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case types.COLLECTION_ADD:
            return {...state, collection: [...state.collection, action.payload]}

        case types.COLLECTION_UPDATE: {
            const {id, ...rest} = action.payload;
            const updatedCollection = state.collection.map(item => {
                return item.id === id
                    ? {...item, ...rest}
                    : item
            })
            return {...state, collection: updatedCollection}
        }

        case types.COLLECTION_REMOVE:
            return {...state, collection: state.collection.filter(item => item.id !== action.payload)}

        case types.CURRENT_FOCUS_SET: {
            return {...state, currentFocus: action.payload};
        }

        case types.FOCUS_HISTORY_ADD:
            return {...state, focusHistory: [...state.focusHistory, action.payload]}

        case types.FOCUS_HISTORY_REMOVE:
            const newFocus = state.focusHistory.filter((item, i, arr) => arr.indexOf(item) === i && item !== action.payload)
            return {...state, focusHistory: newFocus}

        case types.STASH_ADD:
            return {...state, stash: [...state.stash, action.payload]}

        case types.STASH_UPDATE:
            const index = state.stash.findIndex(item => item.id === action.payload.id)
            return {...state, stash: [...state.stash.slice(0, index), action.payload, ...state.stash.slice(index + 1)]}

        default:
            return state;
    }
}

export default reducer