import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
    console.log(props);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-l2pt">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>
                    <img className="imgLogo" src={require('../img/LOGO_ALFATUBE.png')} />
                </Link>
                <Link to={"/"} class="tittleMenu">ALFATUBO</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item item-list-menu " >
                            <NavLink exact to={"/"} className="link-url nav-link" activeClassName="activeMenu"><i class="fas fa-building"></i> Home</NavLink>
                        </li>
                        <li className="nav-item item-list-menu" >
                            <NavLink to={"/ListaVitali"} className="link-url nav-link" activeClassName="activeMenu" ><i class="fas fa-list-alt"></i> Lista Vitali</NavLink>
                        </li>
                        <li className="nav-item item-list-menu" >
                            <NavLink to={"/team"} className="link-url nav-link" activeClassName="activeMenu"><i class="fas fa-users"></i> Team</NavLink>
                        </li>
                        <li className="nav-item item-list-menu" >
                            <a href="/globpop?id=YYYYY" className="link-url nav-link" ><i class="fas fa-cogs"></i> Api</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Header;