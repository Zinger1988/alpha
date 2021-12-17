import {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleContextMenu, WINDOW_CONTEXT_ID, WindowContextMenu } from "../ContextMenu/ContextMenu";
import { Rnd } from "react-rnd";
import { windowsOperations } from "../../redux/window";
import { windowsSelectors } from "../../redux/window";
import windowConfig from "../../constants/window";

import "./Window.scss";

const Window = (props) => {

    const {id, title, type = 'plain', focused} = props;
    const dispatch = useDispatch();  

    const historySelector = useSelector(windowsSelectors.historySelector);
    const config = historySelector.find(item => item.id === id) || windowConfig['default'];
    let refRnd = useRef();

    useEffect(() => {
        if(config.expanded){
            refRnd.updateSize({ width: '100%', height: '100%' });
            refRnd.updatePosition({ x: 0, y: 0 });
        }
    }, [config.expanded])

    const expandWindow = () => {
        if(!config.expanded){
            dispatch(windowsOperations.setWindowsHistory({id: id, ...config, expanded: true}))
        } else {
            refRnd.updateSize({ width: config.width, height: config.height });
            refRnd.updatePosition({ x: config.x, y: config.y });
            dispatch(windowsOperations.setWindowsHistory({id: id, ...config, expanded: false}))
        }
    }

    const closeWindow = (e) => {
        e.stopPropagation();

        const lastConfig = {
            x: refRnd.originalPosition.x,
            y: refRnd.originalPosition.y,
            width: refRnd.resizable.state.width,
            height: refRnd.resizable.state.height,
        }

        if(!config.expanded){
            dispatch(windowsOperations.setWindowsHistory({id: id, expanded: config.expanded, ...lastConfig}))
        }

        dispatch(windowsOperations.closeWindow(id));
    }

    const handleResizeStart = () => {
        if(config.expanded) {
            dispatch(windowsOperations.setWindowsHistory({id: id, ...config, expanded: false}))
        }
    }

    return (
        <>
            <Rnd id={id}
                 bounds='parent'
                 default={config}
                 ref={c => refRnd = c}
                 cancel=".window__body"
                 onMouseDown={() => dispatch(windowsOperations.setFocus(id))}
                 onResizeStart={handleResizeStart}
                 onContextMenu={() => dispatch(windowsOperations.setFocus(id))}
                 className={`window ${focused && 'window--active'} ${config.expanded && 'window--expanded'}`}>
                <div className="window__holder">
                    <div className="window__head" onDoubleClick={expandWindow}>
                        <div className="window__title">
                            {title}
                        </div>
                        <div className="window__controls">
                            <button className="window__controls-btn window__controls-btn--roll-up">
                                <i className="icon icon--xs icon--roll-up"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--expand" onClick={expandWindow}>
                                <i className="icon icon--xs icon--expand"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--close" onClick={closeWindow}>
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

export default Window;