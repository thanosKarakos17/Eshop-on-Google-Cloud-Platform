import '../styles/Header.scss';
import Search from './Search';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/theme.context';
import Badge from '@mui/material/Badge';
import { CartContext } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';
import { SearchProductContext } from '../context/search.context';

export default function Header(){

    const [cart_enter, SetCart] = useState(false);
    const [home_enter, SetHome] = useState(false);

    const {dark, setDark} = useContext(ThemeContext);
    const toggleTheme = () => {
        setDark(prev => !prev);
    }
    
    const {productSet} = useContext(CartContext);
    const [cartAmount, setCartAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let amount = 0;
        productSet.forEach(pr => {amount += pr.quantity});
        setCartAmount(amount);
    }, [productSet]);

    const {setTitleSearch} = useContext(SearchProductContext);

    return(
        <div className='Header'>
            <Search/>
            <i className={`bi bi-house-door${home_enter? '-fill' : ''}`} onMouseEnter={() => {SetHome(true)}} onMouseLeave={() => {SetHome(false)}} onClick={() => {setTitleSearch('');navigate('/')}}></i>
            <i className='bi bi-receipt' onClick={() => {navigate('/orders')}}> Order History</i>
            <i className='bi bi-tools' onClick={() => {navigate('/myproducts')}}> Seller Tools</i>
            <Badge badgeContent={cartAmount} color="primary">
            <i className={`bi bi-cart${cart_enter? '-fill' : ''}`} onMouseEnter={() => {SetCart(true)}} onMouseLeave={() => {SetCart(false)}} onClick={() => {navigate('/cart')}}> Cart</i>
            </Badge>
            <i className='bi bi-person-circle'></i>
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