import '../styles/Header.scss';
import Search from './Search';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/theme.context';
import Badge from '@mui/material/Badge';
import { CartContext } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';

export default function Header(){

    const [cart_enter, SetCart] = useState(false);
    const {dark, setDark} = useContext(ThemeContext);
    const toggleTheme = () => {
        setDark(prev => !prev);
    }
    
    const {productSet} = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(productSet);
    }, [productSet]);

    return(
        <div className='Header'>
            <Search/>
            <i className='bi bi-receipt'> Order History</i>
            <i className='bi bi-tools' onClick={() => {navigate('/myproducts')}}> Seller Tools</i>
            <Badge badgeContent={productSet.length} color="primary">
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