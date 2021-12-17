import "./Header.scss";
import {handleContextMenu, HeaderContextMenu, HEADER_CONTEXT_ID} from "../ContextMenu/ContextMenu";

const Header = () => {

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