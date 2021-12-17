import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleContextMenu, WINDOW_CONTEXT_ID, WindowContextMenu } from "../ContextMenu/ContextMenu";
import PropTypes from 'prop-types';
import { Rnd } from "react-rnd";
import { windowsOperations } from "../../redux/window";
import { windowsSelectors } from "../../redux/window";
import windowConfig from "../../constants/window";

import "./Window.scss";

const Window = (props) => {

    const {id, title, type, expanded} = props;
    const dispatch = useDispatch();

    const focusSelector = useSelector(windowsSelectors.focusSelector);
    const stashSelector = useSelector(windowsSelectors.stashSelector);

    const config = stashSelector.find(item => item.id === id) || windowConfig['default'];
    let refRnd = useRef();

    const isFocused = focusSelector === id;

    useEffect(() => {
        if(config.expanded){
            refRnd.updateSize({ width: '100%', height: '100%' });
            refRnd.updatePosition({ x: 0, y: 0 });
        }
    }, [config.expanded])

    const expandWindow = () => {
        if(!config.expanded){
            dispatch(windowsOperations.setStashCollection({id: id, ...config, expanded: true}))
        } else {
            refRnd.updateSize({ width: config.width, height: config.height });
            refRnd.updatePosition({ x: config.x, y: config.y });
            dispatch(windowsOperations.setStashCollection({id: id, ...config, expanded: false}))
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
            dispatch(windowsOperations.setStashCollection({id: id, expanded: config.expanded, ...lastConfig}))
        }

        dispatch(windowsOperations.closeWindow(id));
    }

    const handleResizeStart = () => {
        if(config.expanded) {
            dispatch(windowsOperations.setStashCollection({id: id, ...config, expanded: false}))
        }
    }

    return (
        <>
            <Rnd id={id}
                 bounds='parent'
                 default={config}
                 ref={c => refRnd = c}
                 cancel=".window__main"
                 onMouseDown={() => dispatch(windowsOperations.setFocus(id))}
                 onResizeStart={handleResizeStart}
                 onContextMenu={() => dispatch(windowsOperations.setFocus(id))}
                 className={`window ${isFocused && 'window--active'} ${config.expanded && 'window--expanded'}`}>
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
};

Window.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    expanded: PropTypes.bool
};

Window.defaultProps = {
    type: "plain",
    expanded: false
};

export default Window;