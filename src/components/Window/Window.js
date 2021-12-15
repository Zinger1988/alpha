import "./Window.scss";
import React, {useState} from "react";
import {Rnd} from "react-rnd";
import { connect } from "react-redux";
import { setActiveWindow, closeWindow, savePosition } from "../../actions/windowsActions";
import {handleContextMenu, WINDOW_CONTEXT_ID, WindowContextMenu} from "../ContextMenu/ContextMenu";
import {useRef} from "react";

const Window = (props) => {

    const {id, title, type = 'plain', setActiveWindow, closeWindow, isActive, savePosition, config} = props;

    const [expanded, setExpanded] = useState(false)

    const defaultPosition = {
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 200
    }

    const size = {
        width: 600,
        height: 400
    }

    const position = config.find(item => item.id === id) || defaultPosition

    const onDragStop = (e, d) => savePosition({id, x: d.x, y: d.y});
    const onResizeStart = (e, d) => {
        setExpanded(false);
    };

    let refRnd = useRef();

    const expand = () => {
        refRnd.updateSize({ width: '100%', height: '100%' });
        refRnd.updatePosition({ x: 0, y: 0 });
        setExpanded(true);
    }

    return (
        <>
            <Rnd className={`window ${isActive && 'window--active'} ${expanded && 'window--expanded'}`} id={id}
                 ref={c => refRnd = c}
                 cancel=".window__body"
                 onClick={() => setActiveWindow(id)}
                 onContextMenu={() => setActiveWindow(id)}
                 bounds='parent'
                 onDragStop={onDragStop}
                 onResizeStart={onResizeStart}
                 default={{...position, ...size}}>
                <div className="window__holder">
                    <div className="window__head" onDoubleClick={() => expand()}>
                        <div className="window__title">
                            {title}
                        </div>
                        <div className="window__controls">
                            <button className="window__controls-btn window__controls-btn--roll-up">
                                <i className="icon icon--xs icon--roll-up"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--expand" onClick={() => expand()}>
                                <i className="icon icon--xs icon--expand"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--close" onClick={() => closeWindow(id)}>
                                <i className="icon icon--xs icon--close"></i>
                            </button>
                        </div>
                    </div>
                    <div className="window__main">
                        {
                            type === 'aside' &&
                            <div className="window__aside">
                                aside
                            </div>
                        }
                        <div className="window__content"
                             onContextMenu={(e) => {
                                 return handleContextMenu({e: e, id: WINDOW_CONTEXT_ID})
                             }}>
                            body
                        </div>
                    </div>

                </div>
            </Rnd>
            <WindowContextMenu />
        </>
    )
}

const mapStateToProps = state => {
    return {
        config: state.windows.config
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveWindow: id => dispatch(setActiveWindow(id)),
        closeWindow: id => dispatch(closeWindow(id)),
        savePosition: coords => dispatch(savePosition(coords)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Window)