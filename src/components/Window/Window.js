import "./Window.scss";
import {Rnd} from "react-rnd";
import { connect } from "react-redux";
import { setActiveWindow, closeWindow } from "../../actions/windowsActions";

const Window = (props) => {

    const {id, title, setActiveWindow, closeWindow, isActive} = props;

    return (
        <Rnd className={`window ${isActive && 'window--active'}`} id={id}
             cancel=".window__body"
             onClick={() => setActiveWindow(id)}
             default={{
                 x: window.innerWidth / 2 - 300,
                 y: window.innerHeight / 2 - 200,
                 width: 600,
                 height: 400}}>
            <div className="window__holder">
                <div className="window__head">
                    <div className="window__title">
                        {title}
                    </div>
                    <div className="window__controls">
                        <button className="window__controls-btn">Collapse</button>
                        <button className="window__controls-btn">Expand</button>
                        <button className="window__controls-btn" onClick={() => closeWindow(id)}>Close</button>
                    </div>
                </div>
                <div className="window__main">
                    <div className="window__aside">
                        aside
                    </div>
                    <div className="window__content">
                        body
                    </div>
                </div>
            </div>
        </Rnd>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveWindow: id => dispatch(setActiveWindow(id)),
        closeWindow: id => dispatch(closeWindow(id))
    }
}

export default connect(null, mapDispatchToProps)(Window)