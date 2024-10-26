import '../styles/Main.scss';
import Products from './Products';
import SellerTools from './SellerTools';
import Cart from './Cart';
import Orders from './Orders';
import { Routes, Route} from "react-router-dom";


export default function Main(){
    return(
        <div className='Main'>
                <Routes>
                    <Route path='/' element={<Products />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/myproducts' element={<SellerTools/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
        </div>
    );
}