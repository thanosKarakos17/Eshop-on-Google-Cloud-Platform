import './styles/App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeContext } from './context/theme.context';
import { useContext, useState, useEffect } from 'react';
import Auth from './auth/Auth';
import Content from './Content';

export default function App(){

    const {dark} = useContext(ThemeContext);
    const [login, setLogin] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
    const [mode, setMode] = useState(sessionStorage.getItem('mode') || '');

    useEffect(() => {
        sessionStorage.setItem('isLoggedIn', login);
        sessionStorage.setItem('mode', mode);
    }, [login, mode]);

    return(
        <div className={`App-${dark ? 'dark' : 'light'}`}>
            {!login ? <Auth proceedFunction={setLogin} modeFunction={setMode}/> : <Content log={mode}/>}
        </div>
    );
}