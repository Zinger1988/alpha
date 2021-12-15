export const ADD_WINDOW = 'ADD_WINDOW';
export const SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const SAVE_POSITION = 'SAVE_POSITION';

export function addWindow(id, title, type) {
    return {
        type: ADD_WINDOW,
        payload: {id, title, type}
    }
}

export function setActiveWindow(id) {
    return {
        type: SET_ACTIVE_WINDOW,
        payload: id
    }
}

export function closeWindow(id) {
    return {
        type: CLOSE_WINDOW,
        payload: id
    }
}

export function savePosition({id, x, y }) {
    return {
        type: SAVE_POSITION,
        payload: {id, x, y}
    }
}