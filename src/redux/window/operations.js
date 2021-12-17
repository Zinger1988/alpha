import actions from "./actions";

const createWindow = (payload) => (dispatch, getState) => {
    const {windows: {collection}} = getState();
    const windowIndex = collection.findIndex(window => window.id === payload.id);

    if(windowIndex < 0) {
        dispatch(actions.createWindowAction(payload));
    }

    dispatch(actions.focusWindowAction(payload.id));
}

const setFocus = (id) => (dispatch) => dispatch(actions.focusWindowAction(id));

const closeWindow = (id) => (dispatch) => dispatch(actions.closeWindowAction(id));

const setWindowsHistory = (config) => (dispatch, getState) => {
    const {windows: {history}} = getState();
    const windowIndex = history.findIndex(window => window.id === config.id);

    if(windowIndex < 0) {
        dispatch(actions.historyAddAction(config));
    } else {
        dispatch(actions.historyUpdateAction(config));
    }
}

export default {
    createWindow,
    setFocus,
    closeWindow,
    setWindowsHistory,
}