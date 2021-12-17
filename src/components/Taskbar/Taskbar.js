import {useDispatch, useSelector} from "react-redux";
import {windowsOperations, windowsSelectors} from "../../redux/window";

import './Taskbar.scss';

const Taskbar = (props) => {
    const dispatch = useDispatch();
    const windowsSelector = useSelector(windowsSelectors.collectionSelector);
    const focusSelector = useSelector(windowsSelectors.focusSelector);

    const setFocus = (id) => dispatch(windowsOperations.setFocus(id));
    const closeWindow = (id) => dispatch(windowsOperations.closeWindow(id));

    return (
        <div className={`taskbar ${props.className || ""}`}>
            {windowsSelector.map(item => {

                const isFocused = focusSelector === item.id;

                return (
                    <div key={item.id} className={`taskbar__item ${isFocused && 'taskbar__item--active'}`}>
                        <button className="taskbar__btn" onClick={() => setFocus(item.id)}>
                            <i className="icon icon-xs icon--folder taskbar__btn-icon"></i>
                            <span className="taskbar__btn-title">{item.title}</span>
                        </button>
                        <i onClick={() => closeWindow(item.id)} className="icon icon-xs icon--close taskbar__close"></i>
                    </div>
                )
            })}
        </div>
    )
}

export default Taskbar;