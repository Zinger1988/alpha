import './App.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Window from "../Window/Window";
import {connect, useDispatch} from "react-redux";
import { windowsOperations } from "../../redux/window";

function App(props) {
    const {windows} = props;

    const dispatch = useDispatch();

    return (
        <div className="page">
            <Header/>
            <main className="main page__main">
                <div className="container">
                    <button onClick={() => dispatch(windowsOperations.createWindow({id: 1, title: 'Window 1'}))}>Open window 1</button>
                    <button onClick={() => dispatch(windowsOperations.createWindow({id: 2, title: 'Window 2'}))}>Open window 2</button>
                    <button onClick={() => dispatch(windowsOperations.createWindow({id: 3, title: 'Window 3'}))}>Open window 3</button>
                </div>
                {windows.map(item => !item.isClosed && <Window key={item.id} id={item.id} title={item.title} focused={item.focused} type={item.type}/>)}
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
