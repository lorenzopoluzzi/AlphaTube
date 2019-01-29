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


        <BrowserRouter>
                    <Switch>
                        <Route path="/" component={App} exact />
                        <Route path="/ListaVitali" component={ListaVitali} />
                        <Route path="/search/:search" component={SearchList} />
                        <Route component={NotFound} />
                    </Switch>
        </BrowserRouter>

    );
};

export default Routes;