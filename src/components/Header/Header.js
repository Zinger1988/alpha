import "./Header.scss";
import { connect } from "react-redux";
import { addWindow } from "../../actions/windowsActions";

const Header = (props) => {

    const {addWindow} = props;

    return (
        <header className="header page__header">
            <div className="container header__container">
                <button onClick={() => addWindow(1, 'Window 1')}>Open window 1</button>
                <button onClick={() => addWindow(2, 'Window 2')}>Open window 2</button>
                <button onClick={() => addWindow(3, 'Window 3')}>Open window 3</button>
            </div>
        </header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addWindow: (id, title) => dispatch(addWindow(id, title))
    }
}

export default connect(null, mapDispatchToProps)(Header)