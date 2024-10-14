import { useNavigate } from 'react-router-dom';
import '../styles/Search.scss';

export default function Search(){
    const navigate = useNavigate();

    return(
        <div className='search-container'>
            <div className='search-icon'>
                <i className='bi bi-search' onClick={() => {navigate('/')}}></i>
            </div>
            <div className='search-input'>
                <input
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