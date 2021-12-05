export const ADD_WINDOW = 'ADD_WINDOW';
export const SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';

export function addWindow(id, title) {
    return {
        type: ADD_WINDOW,
        payload: {id, title}
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