import ProductWidget from "./ProductWidget";
import '../styles/Products.scss';

export default function Products({productList}){

    return(
        <div className='products-container'>
            {productList.map(productData => <ProductWidget 
            Title={productData.Title}
            Image={productData.Image}
            Description={productData.Description}
            Price={productData.Price}
            />)
            }
        </div>
    );
}