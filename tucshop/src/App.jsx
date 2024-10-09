import Header from './components/Header';
import './styles/App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App(){

    const dark = true;
    return(
        <div className={`App-${dark ? 'dark' : 'light'}`}>
            <Header/>
        </div>
    );
}