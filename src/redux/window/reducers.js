import types from "./types";

const initialState = {
    collection: [],
    history: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case types.CREATE_WINDOW:
            return {...state, collection: [...state.collection, action.payload]}

        case types.FOCUS_WINDOW: {
            const focused = state.collection.map(item => {
                item.id === action.payload
                    ? item.focused = true
                    : item.focused = false;
                return item;
            });
            return {...state, collection: focused };
        }

        case types.CLOSE_WINDOW:
            return {...state, collection: state.collection.filter(item => item.id !== action.payload)}

        case types.UPDATE_WINDOWS:
            return {...state, collection: action.payload}

        case types.HISTORY_ADD:
            return {...state, history: [...state.history, action.payload]}

        case types.HISTORY_UPDATE:
            const index = state.history.findIndex(item => item.id === action.payload.id)
            return {...state, history: [...state.history.slice(0, index), action.payload, ...state.history.slice(index + 1)]}

        default:
            return state;
    }
}

export default reducer