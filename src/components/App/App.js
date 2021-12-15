import './App.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Window from "../Window/Window";
import {connect, useDispatch} from "react-redux";
import {addWindow} from "../../actions/windowsActions";

function App(props) {
    const {windows} = props;

    const dispatch = useDispatch();

    return (
        <div className="page">
            <Header/>
            <main className="main page__main">
                <div className="container">
                    <button onClick={() => dispatch(addWindow(1, 'Window 1', 'aside'))}>Open window 1</button>
                    <button onClick={() => dispatch(addWindow(2, 'Window 2', 'aside'))}>Open window 2</button>
                    <button onClick={() => dispatch(addWindow(3, 'Window 3', 'aside'))}>Open window 3</button>
                </div>
                {windows.map(item => <Window key={item.id} id={item.id} isActive={item.isActive} title={item.title} type={item.type}/>)}
            </main>
            <Footer/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        windows: state.windows.collection
    }
}

export default connect(mapStateToProps)(App);
