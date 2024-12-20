import '../styles/Header.scss';
import Search from './Search';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/theme.context';
import Badge from '@mui/material/Badge';
import { CartContext } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';
import { SearchProductContext } from '../context/search.context';
import '../styles/AccountInfo.scss';
import { Button } from '@mui/material';
import Keycloak from 'keycloak-js';

export default function Header({userInfo, logout}){

    const [cart_enter, SetCart] = useState(false);
    const [home_enter, SetHome] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const {dark, setDark} = useContext(ThemeContext);
    const toggleTheme = () => {
        setDark(prev => !prev);
    }
    
    const {productSet} = useContext(CartContext);
    const [cartAmount, setCartAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo?.option == 'Seller') navigate('/myproducts');
    }, [userInfo]);

    useEffect(() => {
        let amount = 0;
        productSet.forEach(pr => {amount += pr.quantity});
        setCartAmount(amount);
    }, [productSet]);

    const {setTitleSearch} = useContext(SearchProductContext);

    function HeaderSeller(){
        return (
            <i className='bi bi-tools' onClick={() => {navigate('/myproducts')}}> Seller Tools</i>
        );
    }

    function HeaderCustomer(){
        return (
            <>
            <Search/>
            <i className={`bi bi-house-door${home_enter? '-fill' : ''}`} onMouseEnter={() => {SetHome(true)}} onMouseLeave={() => {SetHome(false)}} onClick={() => {setTitleSearch('');navigate('/')}}></i>
            <i className='bi bi-receipt' onClick={() => {navigate('/orders')}}> Order History</i>
            <Badge badgeContent={cartAmount} color="primary">
            <i className={`bi bi-cart${cart_enter? '-fill' : ''}`} onMouseEnter={() => {SetCart(true)}} onMouseLeave={() => {SetCart(false)}} onClick={() => {navigate('/cart')}}> Cart</i>
            </Badge>
            </>
        );
    }

    function HeaderGuest(){
        return (
            <>
            <Search/>
            <i className={`bi bi-house-door${home_enter? '-fill' : ''}`} onMouseEnter={() => {SetHome(true)}} onMouseLeave={() => {SetHome(false)}} onClick={() => {setTitleSearch('');loginFunction()}}></i>
            <i className='bi bi-receipt' onClick={() => {loginFunction()}}> Order History</i>
            <Badge badgeContent={cartAmount} color="primary">
            <i className={`bi bi-cart${cart_enter? '-fill' : ''}`} onMouseEnter={() => {SetCart(true)}} onMouseLeave={() => {SetCart(false)}} onClick={() => {loginFunction()}}> Cart</i>
            </Badge>
            </>
        );
    }

    function logoutFunction(){
        navigate('/');
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.setItem('mode', '');
        logoutRequest();
    }

    async function logoutRequest(){
        console.log(logout)
        const data = new URLSearchParams();
        data.append('refresh_token', logout);
        data.append('client_id', global.config.KEYCLOAK_CLIENT);
        data.append('client_secret', global.config.KEYCLOAK_CLIENT_SECRET);
        const result = await fetch(`${global.config.KEYCLOAK_URL}/realms/${global.config.KEYCLOAK_REALM}/protocol/openid-connect/logout`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });
        if(result.ok){window.location.reload()}
      }

    function loginFunction(){
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.setItem('mode', '');
        navigate('/');
        window.location.reload()
    }

    function AccountInfo(){
        return (
            <div className="info-dropdown">
                    <h3>Account Info</h3>
                    <p><strong>Username:</strong> {userInfo?.username || 'N/A'}</p>
                    <p><strong>Email:</strong> {userInfo?.email || 'N/A'}</p>
                    <p><strong>Role:</strong> {userInfo?.option || 'Guest'}</p>
                    <Button variant="contained" color={userInfo? "error" : 'success'} onClick={() => {userInfo? logoutFunction(): loginFunction()}}>
                        {userInfo? 'Logout': 'Login'}
                    </Button>
                </div>
        );
    }

    return(
        <div className='Header'>
            {userInfo?.option === 'Seller' ? <HeaderSeller/> : userInfo?.option === 'Customer' ? <HeaderCustomer/>: <HeaderGuest/>}
            <div className='account-info'>
                <i className='bi bi-person-circle' onClick={() => {setShowInfo(prev => !prev)}}></i>
                {showInfo && <AccountInfo/>}
            </div>
            <div className='theme-toggler'>
                <div className='theme-buttons' onClick={toggleTheme}>
                    <div className={`light-theme-btn ${dark ? '' : 'active'}`}>
                        <i className='bi bi-sun'></i>
                    </div>
                    <div className={`dark-theme-btn ${dark ? 'active' : ''}`}>
                        <i className='bi bi-moon'></i>
                    </div>
                </div>
            </div>
        </div>
    );
}