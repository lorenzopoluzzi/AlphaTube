import React from 'react';
import SubMenu from '../components/SubMenu';
import '../style/team.css';

const Team = (props) => {
    return (
        <div className="pages-div">
            <SubMenu tittle="Team" checksearch />
            <div className="container conteam">
                <div className="card-deck mt-5">
                    <div className="card cardina">
                        <img className="card-img-top" src="img/foglia.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Federico Foglietta</b></h5>
                            <p className="card-text">
                                Nel progetto si è occupato di :
                                <ul>
                                    <li>Recommender Recent</li>
                                    <li>Recommender Related</li>
                                    <li>Lista Vitali</li>
                                    <li>Pagina Team</li>
                                </ul>
                            </p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/lollo.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Lorenzo Poluzzi</b></h5>
                            <p className="card-text">
                                Nel progetto si è occupato di :
                                <ul>
                                    <li>Recommender Popularity</li>
                                    <li>Recommender FVitali</li>
                                    <li>Creazione JSON correlazione video</li>
                                    <li>Recommender Recent</li>
                                </ul>
                            </p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/turroncino.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Lorenzo Turrini</b></h5>
                            <p className="card-text">Nel progetto si è occupato di :
                                <ul>
                                    <li>Pagina Home</li>
                                    <li>Recommender Random</li>
                                    <li>API - Globpop</li>
                                    <li>Informazioni DBpedia</li>
                                    <li>Server della applicazione</li>
                                    <li>Gestione DataBase</li>
                                    <li>Gestione flusso della applicazione</li>
                                    <li>Pagina NotFound</li>
                                    <li>Header e Footer</li>
                                </ul>

                            </p>
                        </div>

                    </div>
                    <div className="card cardina">
                        <img className="card-img-top" src="img/mela.jpg" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title"><b>Melania Ghelli</b></h5>
                            <p className="card-text">Nel progetto si è occupato di :
                                <ul>
                                    <li>Recommender Similarity Genere</li>
                                    <li>Recommender Similarity Artista</li>
                                    <li>Commenti Video</li>
                                    <li>Informazioni Youtube</li>
                                </ul>

                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Team;