import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleContextMenu, WINDOW_CONTEXT_ID, WindowContextMenu } from "../ContextMenu/ContextMenu";
import PropTypes from 'prop-types';
import { Rnd } from "react-rnd";
import { windowsOperations } from "../../redux/window";
import { windowsSelectors } from "../../redux/window";

import "./Window.scss";

const Window = (props) => {
    const dispatch = useDispatch();
    const current = useSelector(windowsSelectors.collectionSelector).find(item => item.id === props.id);
    const stashed = useSelector(windowsSelectors.stashSelector).find(item => item.id === props.id);

    const initConfig = current || stashed || props;
    const {id, title, size, position, children, expanded, enableResizing, disableDragging, minimized} = initConfig;

    const isFocused = useSelector(windowsSelectors.focusSelector) === id;
    let windowRef = useRef(null);

    useEffect(() => {
        if(expanded){
            windowRef.updateSize({ width: '100%', height: '100%' });
            windowRef.updatePosition({ x: 0, y: 0 });
        } else {
            windowRef.updateSize({ width: size.width, height: size.height });
            windowRef.updatePosition({ x: position.x, y: position.y });
        }
    }, [expanded]);

    const handleWindowClose = (e) => {
        dispatch(windowsOperations.windowClose(id));
        dispatch(windowsOperations.setStashCollection(current));
    };

    const handleResizeStop = (e, dir, ref, delta, {x, y}) => {
        if(expanded) return;
        const {offsetWidth, offsetHeight} = ref;
        dispatch(windowsOperations.collectionUpdate({
            id,
            size: {
                width: offsetWidth,
                height: offsetHeight
            },
            position: {x, y}
        }));
    };

    const handleDragStop = (e, {x, y}) => {
        if(expanded) return;
        dispatch(windowsOperations.collectionUpdate({
            id,
            position: {x, y}
        }));
    };

    const handleResizeStart = (e, dir, ref) => {
        if(expanded){
            dispatch(windowsOperations.collectionUpdate({
                id,
                expanded: !expanded
            }));
        }
    }

    const handleWindowExpand = (e) => {
        e.stopPropagation();
        dispatch(windowsOperations.collectionUpdate({
            id,
            expanded: !expanded
        }));
    }

    const handleWindowMinimize = (e) => {
        e.stopPropagation();
        dispatch(windowsOperations.collectionUpdate({
            id,
            minimized: true
        }));
        dispatch(windowsOperations.windowMinify(id));
    }

    const handleWindowFocus = () => dispatch(windowsOperations.currentFocusSet(id));

    return (
        <>
            <Rnd id={id}
                 bounds='parent'
                 default={{...size, ...position}}
                 ref={c => windowRef = c}
                 disableDragging={disableDragging}
                 enableResizing={enableResizing}
                 onResizeStart={handleResizeStart}
                 onResizeStop={handleResizeStop}
                 onDragStop={handleDragStop}
                 cancel=".window__main"
                 className={`window ${isFocused && 'window--focused'} ${expanded && 'window--expanded'} ${minimized && 'window--minimized'}`}>
                <div className="window__holder" onClick={handleWindowFocus}>
                    <div className="window__head">
                        <div className="window__title" onDoubleClick={handleWindowExpand}>
                            {title}
                        </div>
                        <div className="window__controls">
                            <button className="window__controls-btn window__controls-btn--roll-up" onMouseDown={handleWindowMinimize}>
                                <i className="icon icon--xs icon--roll-up"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--expand" onMouseDown={handleWindowExpand}>
                                <i className="icon icon--xs icon--expand"></i>
                            </button>
                            <button className="window__controls-btn window__controls-btn--close" onMouseDown={handleWindowClose}>
                                <i className="icon icon--xs icon--close"></i>
                            </button>
                        </div>
                    </div>
                    <div className="window__main">
                        <div className="window__content"
                             onContextMenu={(e) => {
                                 return handleContextMenu({e: e, id: WINDOW_CONTEXT_ID})
                             }}>
                            {children}
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
    size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    expanded: PropTypes.bool,
    enableResizing: PropTypes.bool,
    disableDragging: PropTypes.bool,
    minimized: PropTypes.bool
};

Window.defaultProps = {
    size: {
        width: 600,
        height: 400,
    },
    position: {
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 200,
    },
    expanded: false,
    enableResizing: true,
    disableDragging: false,
    minimized: false
};

export default Window;