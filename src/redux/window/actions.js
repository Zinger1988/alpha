import types from "./types";

const createWindowAction = (settings) => ({
    type: types.CREATE_WINDOW,
    payload: settings
});

const focusWindowAction = (id) => ({
    type: types.FOCUS_WINDOW,
    payload: id
});

const closeWindowAction = (id) => ({
    type: types.CLOSE_WINDOW,
    payload: id
});

const stashCollectionAddAction = (config) => ({
    type: types.STASH_COLLECTION_ADD,
    payload: config
});

const stashCollectionUpdateAction = (config) => ({
    type: types.STASH_COLLECTION_UPDATE,
    payload: config
});

const stashFocusAddAction = (id) => ({
    type: types.STASH_FOCUS_ADD,
    payload: id
});

const stashFocusRemoveAction = (id) => ({
    type: types.STASH_FOCUS_REMOVE,
    payload: id
});

export default {
    createWindowAction,
    focusWindowAction,
    closeWindowAction,
    stashCollectionAddAction,
    stashCollectionUpdateAction,
    stashFocusAddAction,
    stashFocusRemoveAction
};