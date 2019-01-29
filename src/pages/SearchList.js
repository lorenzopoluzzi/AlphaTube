import React from 'react';
import SubMenu from '../components/SubMenu';
import RecommenderSearch from '../components/RecommenderSearch';


const SearchList = (props) => {
    console.log(props);

    return (
        <div>
            <SubMenu tittle="Youtube Search" checksearch />
            <div className="searchList">
                <RecommenderSearch term={props.match.params.search} />
            </div>
        </div>
    )
};
export default SearchList;