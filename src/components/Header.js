import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-l2pt">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img className="imgLogo" src={require('../img/LOGO_ALFATUBE.png')} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item active">
                            <Link to={"/"} className="link-url nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/ListaVitali"} className="link-url nav-link" >Lista Vitali</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/team"} className="link-url nav-link" >Team</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/globpop?id=YYYYY"} className="link-url nav-link" >Api</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Header;