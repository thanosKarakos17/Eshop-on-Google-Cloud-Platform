import '../styles/Main.scss';
import Products from './Products';
import SellerTools from './SellerTools';
import { PRODUCTS } from "../dummy";


export default function Main(){
    return(
        <div className='Main'>
            {/*<Products productList={PRODUCTS}/>*/}
            <SellerTools/>
        </div>
    );
}