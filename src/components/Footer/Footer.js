import "./Footer.scss";
import Taskbar from "../Taskbar/Taskbar";

const Footer = () => {
    return (
        <footer className="footer page__footer">
            <div className="footer__container">
                <Taskbar />
            </div>
        </footer>
    )
}

export default Footer