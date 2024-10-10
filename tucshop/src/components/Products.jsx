import { PRODUCTS } from "../dummy";
import ProductWidget from "./ProductWidget";
import '../styles/Products.scss';

export default function Products({productList}){

    return(
        <div className='products-container'>
            {PRODUCTS.map(productData => <ProductWidget 
            Title={productData.Title}
            Image={productData.Image}
            Description={productData.Description}
            Price={productData.Price}
            />)
            }
        </div>
    );
}