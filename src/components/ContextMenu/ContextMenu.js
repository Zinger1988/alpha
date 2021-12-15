import {contextMenu, Item, Menu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.css';
import "./ContextMenu.scss";

export const HEADER_CONTEXT_ID = "header-context-menu";
export const FOOTER_CONTEXT_ID = "footer-context-menu";
export const WINDOW_CONTEXT_ID = "window-context-menu"

const headerContextData = [
    {title: 'header 1'},
    {title: 'header 2'},
    {title: 'header 3'}
];

const footerContextData = [
    {title: 'footer 1'},
    {title: 'footer 2'},
    {title: 'footer 3', onClick: () => alert('click')}
];

const windowContextData = [
    {title: 'window 1'},
    {title: 'window 2'},
    {title: 'window 3', onClick: () => alert('click')}
];

export const HeaderContextMenu = () => createMenu(headerContextData, HEADER_CONTEXT_ID);
export const FooterContextMenu = () => createMenu(footerContextData, FOOTER_CONTEXT_ID);
export const WindowContextMenu = () => createMenu(windowContextData, WINDOW_CONTEXT_ID);

export const handleContextMenu = ({e, id, props, position}) => {
    e.preventDefault();
    contextMenu.show({
            id: id,
            event: e,
            props: props || undefined,
            position: position || undefined
        }
    );
};

function createMenu(items, id) {
    const itemsCollection = items.map((item, i) => {
        return <Item key={i} onClick={item.onClick || undefined}>{item.title}</Item>
    });

    return <Menu id={id}>{itemsCollection}</Menu>;
}