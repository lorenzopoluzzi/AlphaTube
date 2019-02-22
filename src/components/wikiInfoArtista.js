import React, { Component } from 'react';
import axios from 'axios';
import VisualizerInfoItem from './VisualizerInfoItem';
import '../style/VisualizerInfo.css';


const dbpediaUrl = 'http://dbpedia.org/sparql';

class WikiInfoArtista extends Component {


    constructor(props) {

        super(props);
        this.state = {
            artista: {
                nomeArtista: "",
                wikiDescrizione: "",
                tipoArtista: "",
                urlImmagine: ""
            },
            errorArtista: false,
            isLoadedArtista: false
        }

        this.getInfoWiki_Artista = this.getInfoWiki_Artista.bind(this);
    }
    componentDidMount() {
        this.getInfoWiki_Artista();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.artista !== prevProps.artista) {
            this.getInfoWiki_Artista();
        }
    }
    getInfoWiki_Artista() {
        axios.get(dbpediaUrl, {
            params: {
                query: 'PREFIX org: <http://dbpedia.org/resource/> ' +
                    'PREFIX dbo: <http://dbpedia.org/ontology/> ' +
                    'PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
                    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
                    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +

                    'SELECT DISTINCT * WHERE { ' +
                    '{ ?artista a dbo:MusicalArtist.' +
                    '?artista rdfs:label ?nome;' +
                    'dbo:thumbnail ?immagine;' +
                    'dbo:abstract ?text .' +
                    '} UNION {' +
                    '?artista a dbo:Band.' +
                    '?artista dbo:background ?tipo.' +
                    '?artista rdfs:label ?nome;' +
                    'dbo:thumbnail ?immagine;' +
                    'dbo:abstract ?text .' +
                    '}' +
                    'FILTER (lang(?nome) = "it")' +
                    'FILTER (lang(?text) = "it")' +

                    'FILTER (regex( ?nome,"' + this.props.artista + '", "i"))' +
                    '}Order by ASC(?artista) Limit 1',
                format: 'json'
            }
        })
            .then(res => {

                //console.log(res);
                let artista = res.data.results.bindings[0];

                //console.log(artista);
                if (artista != null) {
                    this.setState({
                        artista: {
                            nomeArtista: this.props.artista,
                            wikiDescrizione: artista.text.value,
                            tipoArtista: ((artista.tipo) ? artista.tipo.value : ""),
                            urlImmagine: artista.immagine.value

                        },
                    });
                }
                this.setState({ isLoadedArtista: true, errorArtista: false });
            })
            .catch(error => {
                //console.log(error);
                this.setState({ isLoadedArtista: true, errorArtista: true });
            });
    }

    
    render() {
        return (
                <VisualizerInfoItem loaded={this.state.isLoadedArtista} title="Wiki Artista" content={
                    ((this.state.isLoadedArtista) ?
                        ((!this.state.errorArtista) ?
                            ((this.state.artista.wikiDescrizione) ?
                                <div className="content-button">
                                    <img className="wikiInfo__Image" src={this.state.artista.urlImmagine} />
                                    <h2 className="contetTitle">{this.state.artista.nomeArtista}</h2>
                                    <p>{this.state.artista.wikiDescrizione}</p>
                                    {((!this.state.artista.tipoArtista) ?
                                        <div>
                                            <i className="fas fa-user wikiInfo__Icon "></i>
                                            <p>Cantante</p>
                                        </div>
                                        :
                                        <div>
                                            <i className="fas fa-users wikiInfo__Icon"></i>
                                            <p>Band</p>
                                        </div>
                                    )}
                                </div>
                                :
                                <div>
                                    <i className="fas fa-exclamation-circle wikiInfo__Icon"></i>
                                    <h2>L'artista non è stato trovato o non esiste su DBPEDIA.ORG</h2>
                                </div>
                            )
                            :
                            <div>
                                <i className="fas fa-exclamation-circle wikiInfo__Icon"></i>
                                <h2>I server di DBPEDIA.ORG è in manutenzione o inraggiungibile</h2>
                            </div>
                        )
                        :
                        <div className="spinner-grow colore-l2pt-at" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                } />

        );
    }


}
export default WikiInfoArtista;