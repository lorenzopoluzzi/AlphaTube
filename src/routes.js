import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import component associate to the url
import App from './App';
import NotFound from './pages/NotFound';
import ListaVitali from './pages/ListaVitali';
import SearchList from './pages/SearchList';
import Visualizer from './pages/Visualizzer';
import Header from './components/Header';
import Footer from './components/Footer';

const Routes = () => {
    return (


        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={App} exact />
                    <Route path="/ListaVitali" component={ListaVitali} />
                    <Route path="/search/:search" component={SearchList} />
                    <Route path="/video/:videoId" component={Visualizer} />
                    <Route path="/team" />
                    <Route render={(props) => <NotFound {...props} message={"Probabilmente la pagina non è più disponibile o non esite."}
                        sottMessage={"Non siamo riusciti a trovare la pagina che cercavi. Controlla l'indirizzo e riprova"} />} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>

    );
};

export default Routes;