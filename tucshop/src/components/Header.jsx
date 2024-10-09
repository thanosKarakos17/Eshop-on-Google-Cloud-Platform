import '../styles/Header.scss';
import Search from './Search';
import { useEffect, useState } from 'react';

export default function Header(){

    const [cart_enter, SetCart] = useState(false);
    
    return(
        <div className='Header'>
            <Search/>
            <i className='bi bi-receipt'> Order History</i>
            <i className='bi bi-tools'> Seller Tools</i>
            <i className={`bi bi-cart${cart_enter? '-fill' : ''}`} onMouseEnter={() => {SetCart(true)}} onMouseLeave={() => {SetCart(false)}}> Cart</i>
            <i className='bi bi-person-circle'></i>
        </div>
    );
}