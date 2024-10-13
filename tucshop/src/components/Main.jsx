import '../styles/Main.scss';
import Products from './Products';
import SellerTools from './SellerTools';
import { PRODUCTS } from "../dummy";
import Cart from './Cart';
import { BrowserRouter, Routes, Route} from "react-router-dom";


export default function Main(){
    return(
        <div className='Main'>
                <Routes>
                    <Route path='/' element={<Products productList={PRODUCTS}/>} />
                    <Route path='/myproducts' element={<SellerTools/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
        </div>
    );
}