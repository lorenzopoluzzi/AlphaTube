import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import component associate to the url
import Searchbar from "./components/Searchbar";
import App from './App';
import NotFound from './pages/NotFound';
import ListaVitali from './pages/ListaVitali';
import SearchList from './pages/SearchList';

const Routes = () => {
    return (
        <div>
            <div id="navbar">
                <div className="container">
                    <a href="#default" id="logo" className="d-none d-md-block">Alpha Tubo</a>
                    <Searchbar />
                    <div className="float-md-right float-sm-none float-xs-none">
                        <a href="#div-recommender" className="navbarA active ">Recommender</a>
                        <a href="#contact" className="navbarA ">Info</a>
                        <a href="#listaVitali" className="navbarA ">Lista</a>

                    </div>
                </div>
            </div>
            <div id="rotes-container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={App} exact />
                        <Route path="/ListaVitali" component={ListaVitali} />
                        <Route path="/search/:search" component={SearchList} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        </div >
    );
};

export default Routes;