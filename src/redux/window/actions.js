import types from "./types";

const collectionAddAction = (settings) => ({
    type: types.COLLECTION_ADD,
    payload: settings
});

const collectionUpdateAction = (data) => ({
    type: types.COLLECTION_UPDATE,
    payload: data
});

const collectionRemoveAction = (id) => ({
    type: types.COLLECTION_REMOVE,
    payload: id
});

const currentFocusSetAction = (id) => ({
    type: types.CURRENT_FOCUS_SET,
    payload: id
});

const focusHistoryAddAction = (id) => ({
    type: types.FOCUS_HISTORY_ADD,
    payload: id
});

const focusHistoryRemoveAction = (id) => ({
    type: types.FOCUS_HISTORY_REMOVE,
    payload: id
});

const stashAddAction = (config) => ({
    type: types.STASH_ADD,
    payload: config
});

const stashUpdateAction = (config) => ({
    type: types.STASH_UPDATE,
    payload: config
});

export default {
    collectionAddAction,
    currentFocusSetAction,
    collectionRemoveAction,
    stashAddAction,
    stashUpdateAction,
    focusHistoryAddAction,
    focusHistoryRemoveAction,
    collectionUpdateAction
};