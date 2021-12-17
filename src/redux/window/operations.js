import actions from "./actions";

const createWindow = (settings) => (dispatch, getState) => {
    const {windows: {current: {collection}}} = getState();
    const windowIndex = collection.findIndex(window => window.id === settings.id);

    if(windowIndex < 0) {
        dispatch(actions.createWindowAction({...settings, expanded: false}));
    }

    dispatch(setFocus(settings.id));
}

const setFocus = (id) => (dispatch, getState) => {
    const {windows: {current: {focus}}} = getState();

    if(id !== focus){
        dispatch(actions.focusWindowAction(id));
        dispatch(actions.stashFocusAddAction(id));
    }
};

const closeWindow = (id) => (dispatch, getState) => {
    dispatch(actions.closeWindowAction(id));
    dispatch(actions.stashFocusRemoveAction(id));

    const {windows: {stash: {focus}}} = getState();

    if(focus.length !== 0){
        dispatch(actions.focusWindowAction(focus[focus.length - 1]));
    }
};

const setStashCollection = (config) => (dispatch, getState) => {
    const {windows: {stash: {collection}}} = getState();
    const windowIndex = collection.findIndex(window => window.id === config.id);

    windowIndex < 0
        ? dispatch(actions.stashCollectionAddAction(config))
        : dispatch(actions.stashCollectionUpdateAction(config));
}

export default {
    createWindow,
    setFocus,
    closeWindow,
    setStashCollection,
}