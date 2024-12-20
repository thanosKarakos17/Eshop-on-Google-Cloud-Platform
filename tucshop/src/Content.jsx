import Header from './components/Header';
import './styles/App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeContext } from './context/theme.context';
import { useContext, useEffect, useState } from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import App2 from './auth/Keyckloac';

export default function Content({log}){

    const {dark} = useContext(ThemeContext);
    //const {isLogin, token, userInfo, logout} = useAuth(log === 'login');
    const [userInfo, SetUserInfo] = useState(null);
    const [token, SetToken] = useState(null);
    const [logout, SetLogout] = useState(null);

    return(
        <div className={`App-${dark ? 'dark' : 'light'}`}>
            {log === 'login' && (!userInfo && !token && !logout) ? <App2 setInfo={SetUserInfo} setToken={SetToken} setLogout={SetLogout}/> : 
            <BrowserRouter>
            <Header userInfo={userInfo} logout={logout}/>
            <Main token={token}/>
            </BrowserRouter>}
        </div>
    );
}