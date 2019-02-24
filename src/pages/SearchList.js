import React from 'react';
import SubMenu from '../components/SubMenu';
import RecommenderSearch from '../components/RecommenderSearch';
import '../style/pages.css';


const SearchList = (props) => {
    sessionStorage.setItem('recUsato', 'recSearch');

    return (
        <div className="pages-div">
            <SubMenu tittle="Youtube Search" checksearch  />
            <div className="searchList" >
                <RecommenderSearch term={props.match.params.search} />
            </div>
        </div>
    )
};
export default SearchList;