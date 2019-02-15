import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import SubMenu from "./components/SubMenu";
import { Link, NavLink } from 'react-router-dom';
import Searchbar from './components/Searchbar';

class App extends Component {

    sottMenu = [{
        id: '#div-start',
        name: 'Inizia'
    },
    {
        id: '#team',
        name: 'Team'
    }
    ];

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="App">
                <SubMenu tittle="HOME" checksearch submenu={this.sottMenu} />
                <div className="jumbotron jumbotron-fluid home_strip__content">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-md-3">
                                <img className="logo-home" src={require('./img/LOGO_ALFATUBE.png')} />
                            </div>
                            <div className="col-md-7 div-tittle">
                                <h1 className="display-3 ">ALFATUBO</h1>
                                <p className="lead">Il portale Musicale di raccomandazione basato su Youtube</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container shadow p-3 mb-5 bg-white rounded" id="div-start">
                    <h4 className="h1 text-uppercase font-weight-bold">Inzia Ad Ascoltare</h4>
                    <p>Inzia il tuo ascolto scegliendo se ricercare una canzone o un artista, o se fidarti dei nostri esperti che hanno selezionato una lista di canzoni divisa per generi.
                        Più utilizzerai il portale più sarà facile consigliarti e personalizzare la tua esperienza fino a quando non potrai farne a meno.
                    </p>
                    <div className="row justify-content-center home-button-div">
                        <div className="col-md-6">
                            <Link to={"/ListaVitali"} className="btn btn-primary button-listaVitali" onClick={() => setTimeout(() => window.scrollTo(0, 0), 1000)} >
                                <i className="fas fa-list-alt"></i> Lista Vitali
                            </Link>
                        </div>
                        <div className="col-md-6 content-search">
                            <Searchbar />
                        </div>
                    </div>
                </div>
                <div className="container shadow p-3 mb-5 bg-white rounded" id="team" >
                    <h4 className="h1 text-uppercase font-weight-bold">Conoscici</h4>
                    <p> Il team di sviluppo è fiero del suo portale, così tanto fiero che ha deciso di non nascondersi e prendersi i meriti.
                        Andate a conoscerli non ve ne pentirete...
                    </p>
                    <div className="row justify-content-center">
                        <Link to={"/Team"} className="btn btn-primary button-listaVitali" onClick={() => setTimeout(() => window.scrollTo(0, 0), 1000)}>
                            <i className="fas fa-users"></i> Team
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

}
export default App;