import React from 'react';
import Searchbar from './Searchbar';
import { Link, NavLink } from 'react-router-dom';

const goTop = (evt) => {
    evt.preventDefault();

}

const Footer = (props) => {
    
    console.log(props);
    return (
        <footer className="page-footer font-small blue ">
            <div className="container-fluid text-center text-md-left bg-light">
                <div className="row">
                    <div class="col-md-5 mt-md-0 mt-3">
                        <img className="imgAlfaFooter" src={require('../img/LOGO_ALFATUBE.png')} />
                        <p className="citazione">"Ciò che non si può dire e ciò che non si può tacere, la musica lo esprime."</p>
                        <p className="citazione-autore">Victor Hugo</p>
                    </div>
                    <hr class="clearfix w-100 d-md-none pb-3" />
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5 class="text-uppercase spacingPadd font-weight-bold">Pagine</h5>
                        <hr class="teal accent-3 mb-4 mt-0 d-inline-block  hr-footer" ></hr>

                        <ul class="list-unstyled mb-0">
                            <li className=" item-list-menu footer-list">
                                <NavLink exact to={"/"} className="link-url nav-link" activeClassName="activeMenu"><i className="fas fa-building"></i> Home</NavLink>
                            </li>
                            <li className=" item-list-menu" >
                                <NavLink to={"/ListaVitali"} className="link-url nav-link" activeClassName="activeMenu" ><i className="fas fa-list-alt"></i> Lista Vitali</NavLink>
                            </li>
                            <li className=" item-list-menu" >
                                <NavLink to={"/team"} className="link-url nav-link" activeClassName="activeMenu"><i className="fas fa-users"></i> Team</NavLink>
                            </li>
                            <li className=" item-list-menu" >
                                <a href="/globpop?id=YYYYY" className="link-url nav-link" ><i className="fas fa-cogs"></i> Api</a>
                            </li>
                        </ul>

                    </div>
                    <div class="col-md-4 mb-md-0 mb-3">
                        <h5 class="text-uppercase spacingPadd font-weight-bold">Development Team</h5>
                        <hr class="teal accent-3 mb-4 mt-0 d-inline-block  hr-footer" ></hr>
                        <ul class="list-unstyled mb-0">
                            <li className=" item-list-menu footer-list">
                                <img id="logo-l2pt" src={require('../img/l2pt_trasparente.png')} />
                                <button className="footer-buttTop" id="footer-goTop"><i className="fas fa-arrow-alt-circle-up"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className="footer-copyright text-center py-3">
                <p>© 2018 Copyright. All Rights Reserved by
              <a > <span>L2PT</span> & Melania Ghelli & Federico Foglietta.</a>
                </p>
            </div>

        </footer >
    );
}

export default Footer;