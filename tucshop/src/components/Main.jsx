import '../styles/Main.scss';
import ProductCreation from './ProductCreation';
import Products from './Products';
import ProductWidget from './ProductWidget';


export default function Main(){
    return(
        <div className='Main'>
            <Products/>
            <ProductCreation></ProductCreation>
        </div>
    );
}