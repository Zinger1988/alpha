const stashSelector = state => state.windows.stash.collection;
const collectionSelector = state => state.windows.current.collection;
const focusSelector = state => state.windows.current.focus;

export default {
    stashSelector,
    collectionSelector,
    focusSelector
}