import types from "./types";

const createWindowAction = (settings) => ({
    type: types.CREATE_WINDOW,
    payload: settings
});

const updateWindowsAction = (windowsArr) => ({
    type: types.UPDATE_WINDOWS,
    payload: windowsArr
});

const focusWindowAction = (id) => ({
    type: types.FOCUS_WINDOW,
    payload: id
});

const closeWindowAction = (id) => ({
    type: types.CLOSE_WINDOW,
    payload: id
});

const historyAddAction = (config) => ({
    type: types.HISTORY_ADD,
    payload: config
})

const historyUpdateAction = (config) => ({
    type: types.HISTORY_UPDATE,
    payload: config
})

export default {
    createWindowAction,
    focusWindowAction,
    closeWindowAction,
    updateWindowsAction,
    historyAddAction,
    historyUpdateAction
};