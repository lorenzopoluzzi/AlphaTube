import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import component associate to the url
import App from './App';
import NotFound from './pages/NotFound';
import ListaVitali from './components/ListaVitali'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/vitali" component={ListaVitali}  />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;