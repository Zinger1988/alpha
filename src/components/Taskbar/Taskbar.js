import "./Taskbar.scss";
import {connect} from "react-redux";
import {closeWindow, setActiveWindow} from "../../actions/windowsActions";

import './Taskbar.scss';

const Taskbar = (props) => {

    const {windows, setActiveWindow, closeWindow} = props;

    return (
        <div className={`taskbar ${props.className || ""}`}>
            {windows.map(item => {
                return (
                    <div key={item.id} className={`taskbar__item ${item.isActive && 'taskbar__item--active'}`}>
                        <button className="taskbar__btn" onClick={() => setActiveWindow(item.id)}>
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

const mapStateToProps = state => {
    return {
        windows: state.windows.collection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveWindow: id => dispatch(setActiveWindow(id)),
        closeWindow: id => dispatch(closeWindow(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);