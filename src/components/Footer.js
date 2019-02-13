import React from 'react';
import Searchbar from './Searchbar';

const Footer = (props) => {
    console.log(props);
    return (
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div class="col-md-6 mt-md-0 mt-3">
                        <img />
                        <img />
                    </div>
                    <hr class="clearfix w-100 d-md-none pb-3" />
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5 class="text-uppercase">PAGINE</h5>

                        <ul class="list-unstyled">
                            <li>
                                <a href="#!">Link 1</a>
                            </li>
                            <li>
                                <a href="#!">Link 2</a>
                            </li>
                            <li>
                                <a href="#!">Link 3</a>
                            </li>
                            <li>
                                <a href="#!">Link 4</a>
                            </li>
                        </ul>

                    </div>
                    <div class="col-md-3 mb-md-0 mb-3">
                    
                    </div>
                </div>

            </div>

            <div className="footer-copyright text-center py-3">© 2018 Copyright. All Rights Reserved by
              <a > <span className="">L2PT</span> & Melania Ghelli & Federico Foglietta.</a>
            </div>

        </footer>
    );
}

export default Footer;