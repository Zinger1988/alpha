import { useDispatch, useSelector } from "react-redux";
import { windowsOperations, windowsSelectors } from "../../redux/window";

import './Taskbar.scss';

const Taskbar = (props) => {
    const dispatch = useDispatch();
    const windowsSelector = useSelector(windowsSelectors.collectionSelector);
    const focusSelector = useSelector(windowsSelectors.focusSelector);
    const collectionSelector = useSelector(windowsSelectors.collectionSelector);

    const handleWindowFocus = (id, collection) => {
        const current = collection.find(item => item.id === id);

        if(current.minimized){
            dispatch(windowsOperations.collectionUpdate({
                id,
                minimized: false
            }));
            dispatch(windowsOperations.currentFocusSet(id));
        }

        if(!current.minimized && focusSelector !== id){
            dispatch(windowsOperations.currentFocusSet(id));
        }

        if(!current.minimized && focusSelector === id){
            dispatch(windowsOperations.collectionUpdate({
                id,
                minimized: true
            }));

            dispatch(windowsOperations.windowMinify(id));
        }
    };

    const handleWindowClose = (id, collection) => {
        const current = collection.find(item => item.id === id);
        dispatch(windowsOperations.windowClose(id));
        dispatch(windowsOperations.setStashCollection({...current, minimized: false}));
    };

    return (
        <div className={`taskbar ${props.className || ""}`}>
            {
                windowsSelector.map(item => {
                    const isFocused = focusSelector === item.id;
                    const isMinimized = item.minimized;

                    return (
                        <div key={item.id} className={`taskbar__item ${isFocused && 'taskbar__item--active'} ${isMinimized && 'taskbar__item--minimized'}`}>
                            <button className="taskbar__btn" onClick={() => handleWindowFocus(item.id, collectionSelector)}>
                                <i className="icon icon-xs icon--folder taskbar__btn-icon"></i>
                                <span className="taskbar__btn-title">{item.title}</span>
                            </button>
                            <i onClick={() => handleWindowClose(item.id, collectionSelector)} className="icon icon-xs icon--close taskbar__close"></i>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Taskbar;