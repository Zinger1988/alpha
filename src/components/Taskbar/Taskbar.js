import "./Taskbar.scss";
import {connect} from "react-redux";
import {closeWindow, setActiveWindow} from "../../actions/windowsActions";

const Taskbar = (props) => {

    const {windows, setActiveWindow, closeWindow} = props;

    return (
        <ul className="taskbar">
            {windows.map(item => {
                return (
                    <button key={item.id} className="taskbar__btn" onClick={() => setActiveWindow(item.id)}>
                        <span className="taskbar__btn-text">{item.title}</span>
                        <span onClick={() => closeWindow(item.id)} className="taskbar__btn-close">🞫</span>
                    </button>
                )
            })}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        windows: state.windows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveWindow: id => dispatch(setActiveWindow(id)),
        closeWindow: id => dispatch(closeWindow(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);