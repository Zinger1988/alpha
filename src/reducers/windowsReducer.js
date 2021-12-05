import { ADD_WINDOW, SET_ACTIVE_WINDOW, CLOSE_WINDOW } from '../actions/windowsActions';

const initialState = []

export function windowsReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_WINDOW:
            const isWindowExist = state.find((item, i) => {
                return item.id === action.payload.id
            });

            if(isWindowExist){
                return state
            } else {
                const updatedActivity = state.map(item => {
                    item.isActive = false;
                    return item
                })
                return [...updatedActivity, {...action.payload, isActive: true}]
            }

        case SET_ACTIVE_WINDOW:
            const updatedActivity = state.map(item => {
                item.id === action.payload
                    ? item.isActive = true
                    : item.isActive = false;
                return item
            })
            return [...updatedActivity]

        case CLOSE_WINDOW:
            const updatedWindows = [...state.filter((item, i) => {
                return item.id !== action.payload
            })]

            updatedWindows.forEach((item, i) => {
                if(i === updatedWindows.length - 1){
                    item.isActive = true;
                    return
                }
                item.isActive = false;
            })

            return updatedWindows

        default:
            return state;
    }
}