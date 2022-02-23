import actions from "./actions";

const windowCreate = (settings) => (dispatch, getState) => {

    const defaults = {
        size: {
            width: 600,
            height: 400
        },
        position: {
            x: window.innerWidth / 2 - 300,
            y: window.innerHeight / 2 - 200,
        },
        expanded: false,
        enableResizing: true,
        disableDragging: false,
        minimized: false,
        children: null
    }

    const {windows: {collection, stash}} = getState();
    const windowIndex = collection.findIndex(window => window.id === settings.id);
    const stashIndex = stash.findIndex(window => window.id === settings.id);

    if(windowIndex < 0 && stashIndex < 0) {
        dispatch(actions.collectionAddAction({...defaults, ...settings}));
    }

    if(windowIndex < 0 && stashIndex >= 0){
        dispatch(actions.collectionAddAction(stash[stashIndex]));
    }

    dispatch(currentFocusSet(settings.id));
}

const collectionUpdate = (data) => (dispatch) => {
    dispatch(actions.collectionUpdateAction(data))
}

const currentFocusSet = (id) => (dispatch, getState) => {
    const {windows: {currentFocus}} = getState();

    if(id !== currentFocus){
        dispatch(actions.currentFocusSetAction(id));
        dispatch(actions.focusHistoryAddAction(id));
    }

    dispatch(actions.collectionUpdateAction({id, minimized: false}));
};

const windowClose = (id) => (dispatch, getState) => {
    dispatch(actions.collectionRemoveAction(id));
    dispatch(actions.focusHistoryRemoveAction(id));

    const {windows: {focusHistory}} = getState();

    if(focusHistory.length !== 0){
        dispatch(actions.currentFocusSetAction(focusHistory[focusHistory.length - 1]));
    }
};

const windowMinify = (id) => (dispatch, getState) => {
    const {windows: {focusHistory}} = getState();

    dispatch(actions.focusHistoryRemoveAction(id));

    if(focusHistory.length !== 0){
        dispatch(actions.currentFocusSetAction(focusHistory[focusHistory.length - 1]));
    }
}

const setStashCollection = (config) => (dispatch, getState) => {
    const {windows: {stash}} = getState();
    const windowIndex = stash.findIndex(window => window.id === config.id);

    windowIndex < 0
        ? dispatch(actions.stashAddAction(config))
        : dispatch(actions.stashUpdateAction(config));
}

export default {
    windowCreate,
    currentFocusSet,
    windowClose,
    setStashCollection,
    collectionUpdate,
    windowMinify
}