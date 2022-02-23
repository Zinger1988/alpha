const collectionSelector = state => state.windows.collection;
const focusSelector = state => state.windows.currentFocus;
const stashSelector = state => state.windows.stash;

export default {
    collectionSelector,
    focusSelector,
    stashSelector
}