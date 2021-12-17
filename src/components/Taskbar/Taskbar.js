import {useDispatch, useSelector} from "react-redux";
import {windowsOperations, windowsSelectors} from "../../redux/window";

import './Taskbar.scss';

const Taskbar = (props) => {
    const windows = useSelector(windowsSelectors.collectionSelector);
    const dispatch = useDispatch();

    return (
        <div className={`taskbar ${props.className || ""}`}>
            {windows.map(item => {
                return (
                    <div key={item.id} className={`taskbar__item ${item.focused && 'taskbar__item--active'}`}>
                        <button className="taskbar__btn" onClick={() => dispatch(windowsOperations.setFocus(item.id))}>
                            <i className="icon icon-xs icon--folder taskbar__btn-icon"></i>
                            <span className="taskbar__btn-title">{item.title}</span>
                        </button>
                        {/*<i onClick={() => closeWindow(item.id)} className="icon icon-xs icon--close taskbar__close"></i>*/}
                    </div>
                )
            })}
        </div>
    )
}

export default Taskbar;