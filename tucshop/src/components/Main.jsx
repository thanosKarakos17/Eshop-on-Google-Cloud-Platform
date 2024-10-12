import '../styles/Main.scss';
import Products from './Products';
import SellerTools from './SellerTools';
import { PRODUCTS } from "../dummy";
import Cart from './Cart';


export default function Main(){
    return(
        <div className='Main'>
            {/*<Products productList={PRODUCTS}/>*/}
            <SellerTools/>
            {/*<Cart/>*/}
        </div>
    );
}