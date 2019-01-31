import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import component associate to the url
import Searchbar from "./components/Searchbar";
import App from './App';
import NotFound from './pages/NotFound';
import ListaVitali from './pages/ListaVitali';
import SearchList from './pages/SearchList';
import Visualizer from './pages/Visualizzer';

const Routes = () => {
    return (


        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/ListaVitali" component={ListaVitali} />
                <Route path="/search/:search" component={SearchList} />
                <Route path="/video/:videoId" component={Visualizer} />
                <Route render={(props) => <NotFound {...props} message={"Probabilmente la pagina non è più disponibile o non esite."} 
                                sottMessage={"Non siamo riusciti a trovare la pagina che cercavi. Controlla l'indirizzo e riprova"}/>} />
            </Switch>
        </BrowserRouter>

    );
};

export default Routes;