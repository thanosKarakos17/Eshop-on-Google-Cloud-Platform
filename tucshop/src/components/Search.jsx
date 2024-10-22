import { useNavigate } from 'react-router-dom';
import '../styles/Search.scss';
import { useContext, useRef } from 'react';
import { SearchProductContext } from '../context/search.context';

export default function Search(){
    const navigate = useNavigate();
    const productTitle = useRef();

    const {setTitleSearch} = useContext(SearchProductContext);

    function handleSearch(){
        const title = productTitle.current.value.trim().replace(/\s+/g, ' ');
        setTitleSearch(title);
        navigate('/')
    }

    return(
        <div className='search-container'>
            <div className='search-icon'>
                <i className='bi bi-search' onClick={handleSearch}></i>
            </div>
            <div className='search-input'>
                <input
                    ref={productTitle}
                    type='text'
                    name='search-city'
                    placeholder='Search Product ...'
                    /*value={text}
                    onChange={onSearch}*/
                />
            </div>
        </div>
    );
}