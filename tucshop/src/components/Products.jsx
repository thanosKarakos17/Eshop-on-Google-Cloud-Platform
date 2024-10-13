import ProductWidget from "./ProductWidget";
import '../styles/Products.scss';

export default function Products({productList}){

    return(
        <div className='products-container'>
            {productList.map(productData => <ProductWidget productData={productData}/>)
            }
        </div>
    );
}