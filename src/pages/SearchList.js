import React from 'react';
import Searchbar from '../components/Searchbar';
import RecommenderSearch from '../components/RecommenderSearch';


const SearchList = (props) => {
    console.log(props);
    return (
        <div className="searchList">
            <h1><i className="fab fa-youtube"></i>Youtube Search</h1>
            <Searchbar />
            <RecommenderSearch term={props.match.params.search} />
        </div>
    )
};
export default SearchList;