import "./Header.scss";
import { useDispatch } from "react-redux";
import {handleContextMenu, HeaderContextMenu, HEADER_CONTEXT_ID} from "../ContextMenu/ContextMenu";
import {addWindow} from "../../actions/windowsActions";

const Header = () => {

    const dispatch = useDispatch();

    const menu = [
        {
            title: 'Сайты',
            collection: [
                {
                    title: 'Opn window 4',
                    callback() {dispatch(addWindow(4, 'Window 4'))}
                },
                {
                    title: 'Opn window 5',
                    callback() {dispatch(addWindow(5, 'Window 5'))}
                },
                {
                    title: 'Opn window 6',
                    callback() {dispatch(addWindow(6, 'Window 6'))}
                },
                {
                    title: 'Opn window 7',
                    callback() {dispatch(addWindow(7, 'Window 7'))}
                }
            ]
        }
    ]

    return (
        <header className="header page__header"
                onContextMenu={(e) => handleContextMenu({e: e, id: HEADER_CONTEXT_ID})}>
            <div className="container">
                <div className="header__holder">
                    <img className="logo header__logo" src="logo.svg" alt="Alpha ERP"/>
                </div>
            </div>
            <HeaderContextMenu />
        </header>
    )
}

export default Header