import './App.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Window from "../Window/Window";
import {connect} from "react-redux";

function App(props) {

    const {windows} = props;

    return (
        <div className="page">
            <Header />
            <main className="main page__main">
                {windows.map(item => <Window key={item.id} id={item.id} isActive={item.isActive} title={item.title}/>)}
            </main>
            <Footer />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        windows: state.windows
    }
}

export default connect(mapStateToProps)(App);
