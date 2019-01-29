import React from 'react';
import Searchbar from './Searchbar';
import '../style/sottomenu.css';

const SubMenu = ({tittle, checksearch, submenu}) => {
    console.log(tittle);
    console.log(checksearch);
    console.log(submenu);
    return (
            
        <div id="navbar">
            <div className="container">
                <a href="#default" id="logo" className="d-none d-md-block" > {tittle} </a>
                {   ((checksearch)?
                         <Searchbar />
                    :
                    null)
                }
                {
                    ((submenu) ?
                    <div className="float-md-right float-sm-none float-xs-none">
                    {
                        submenu.map((item) => {
                            <a href={submenu.id} className="navbarA active ">{submenu.name}</a>
                        }) 
                    }
                    </div>
                    : null
                    )
                }
            </div>
        </div>
    );

};

export default SubMenu;
