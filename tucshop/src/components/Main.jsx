import '../styles/Main.scss';
import Products from './Products';
import SellerTools from './SellerTools';
import Cart from './Cart';
import Orders from './Orders';
import { Routes, Route} from "react-router-dom";


export default function Main({token}){
    return(
        <div className='Main'>
                <Routes>
                    <Route path='/' element={<Products/>} />
                    <Route path='/orders' element={<Orders token={token}/>} />
                    <Route path='/myproducts' element={<SellerTools token={token}/>}/>
                    <Route path='/cart' element={<Cart token={token}/>}/>
                </Routes>
        </div>
    );
}