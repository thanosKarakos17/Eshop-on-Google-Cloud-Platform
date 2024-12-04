import Header from './components/Header';
import './styles/App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeContext } from './context/theme.context';
import { useContext } from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import useAuth from './auth/useAuth';

export default function Content({log}){

    const {dark} = useContext(ThemeContext);
    const {isLogin, token, userInfo, logout} = useAuth(log === 'login');

    return(
        <div className={`App-${dark ? 'dark' : 'light'}`}>
            <BrowserRouter>
            <Header userInfo={userInfo} logout={logout}/>
            <Main token={token}/>
            </BrowserRouter>
        </div>
    );
}