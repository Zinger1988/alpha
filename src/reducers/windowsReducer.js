import { ADD_WINDOW, SET_ACTIVE_WINDOW, CLOSE_WINDOW, SAVE_POSITION} from '../actions/windowsActions';

const initialState = {
    collection: [],
    config: []
}

export function windowsReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_WINDOW:
            const isWindowExist = state.collection.find((item, i) => {
                return item.id === action.payload.id
            });

            if(isWindowExist){
                return state
            } else {
                const updatedActivity = state.collection.map(item => {
                    item.isActive = false;
                    return item
                })
                return {...state, collection: [...updatedActivity, {...action.payload, isActive: true}]}
            }

        case SET_ACTIVE_WINDOW:
            const updatedActivity = state.collection.map(item => {
                item.id === action.payload
                    ? item.isActive = true
                    : item.isActive = false;
                return item
            })
            return {...state, collection:[...updatedActivity]}

        case CLOSE_WINDOW:
            const updatedWindows = [...state.collection.filter((item, i) => {
                return item.id !== action.payload
            })]

            updatedWindows.forEach((item, i) => {
                if(i === updatedWindows.length - 1){
                    item.isActive = true;
                    return
                }
                item.isActive = false;
            })

            return {...state, collection: updatedWindows}

        case SAVE_POSITION:
            const {id, x, y} = action.payload;
            const configIndex = state.config.findIndex(item => item.id === id)

            if(configIndex >= 0){
                const newConfig = [...state.config];
                newConfig[configIndex] = {...newConfig[configIndex], x, y}

                return {...state, config: newConfig}
            }

            return {...state, config: [...state.config, {id, x, y}]}

        default:
            return state;
    }
}