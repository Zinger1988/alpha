import './App.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Window from "../Window/Window";
import { useDispatch, useSelector } from "react-redux";
import { windowsOperations, windowsSelectors } from "../../redux/window";

import Dummy from "../Dummy/Dummy";

function App() {

    const windowSelector = useSelector(windowsSelectors.collectionSelector);
    const dispatch = useDispatch();

    return (
        <div className="page">
            <Header/>
            <main className="main page__main">
                <div className="container">
                    <button onClick={() => dispatch(windowsOperations.windowCreate({id: 1, title: 'Window 1'}))}>Open window 1</button>
                    <button onClick={() => dispatch(windowsOperations.windowCreate({id: 2, title: 'Window 2'}))}>Open window 2</button>
                    <button onClick={() => dispatch(windowsOperations.windowCreate({id: 3, title: 'Dummy', children: <Dummy/>}))}>Open Dummy</button>
                </div>
                {windowSelector.map(item => <Window key={item.id} id={item.id} title={item.title}/>)}
            </main>
            <Footer/>
        </div>
    );
}

export default App;
