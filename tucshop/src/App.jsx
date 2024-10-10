import Header from './components/Header';
import './styles/App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeContext } from './context/theme.context';
import { useContext } from 'react';
import Main from './components/Main';

export default function App(){

    const {dark} = useContext(ThemeContext);
    return(
        <div className={`App-${dark ? 'dark' : 'light'}`}>
            <Header/>
            <Main/>
        </div>
    );
}