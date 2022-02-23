import "./Footer.scss";
import Taskbar from "../Taskbar/Taskbar";
import { handleContextMenu, FooterContextMenu, FOOTER_CONTEXT_ID } from "../ContextMenu/ContextMenu";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";

const Footer = () => {

    return (
        <>
            <footer className="footer page__footer"
                    onContextMenu={(e) => handleContextMenu({e: e, id: FOOTER_CONTEXT_ID})}>
                <div className="container">
                    <div className="footer__holder">
                        <Taskbar className="footer__taskbar"/>
                        <CurrencyConverter className="footer__currencyConverter"/>
                    </div>
                </div>
            </footer>
            <FooterContextMenu />
        </>
    )
}

export default Footer