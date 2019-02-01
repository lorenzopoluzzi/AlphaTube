import React, { Component } from 'react';
import axios from 'axios';
import VisualizerInfoItem from './VisualizerInfoItem';
import '../style/VisualizerInfo.css';


const dbpediaUrl = 'http://dbpedia.org/sparql';

class WikiInfo extends Component {


    constructor(props) {

        super(props);
        this.state = {
            artista: {
                nomeArtista: "",
                wikiDescrizione: "",
                tipoArtista: "",
                urlImmagine: ""
            },
            canzone: {
                nomeCanzone: "",
                wikiDescrizione: "",
                anno: "",
                artista: "",
                album: "",
                genere: ""
            },
            errorArtista: false,
            errorCanzone: false,
            isLoadedArtista: false,
            isLoadedCanzone: false
        }

        this.getInfoWiki_Artista = this.getInfoWiki_Artista.bind(this);
        this.getInfoWiki_Canzone = this.getInfoWiki_Canzone.bind(this);
    }
    componentDidMount() {
        this.getInfoWiki_Artista();
        this.getInfoWiki_Canzone();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.artista !== prevProps.artista && this.props.canzone !== prevProps.canzone) {
            this.getInfoWiki_Artista();
            this.getInfoWiki_Canzone();
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

                let artista = res.data.results.bindings[0];

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
                this.setState({ isLoadedArtista: true, errorArtista: true });
            });
    }

    getInfoWiki_Canzone() {
        axios.get(dbpediaUrl, {
            params: {
                query: 'PREFIX org: <http://dbpedia.org/resource/> ' +
                    'PREFIX dbo: <http://dbpedia.org/ontology/> ' +
                    'PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
                    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
                    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' +

                    'SELECT DISTINCT ?titolo ?text ?anno ?nomeArtista ?nomeGenere ?nomeAlbum WHERE { ' +
                    '?canzone a dbo:MusicalWork;' +
                    ' dbo:abstract ?text ;' +
                    'dbo:releaseDate ?anno;' +
                    'rdfs:label ?titolo.' +
                    '{ ?canzone dbo:musicalArtist ?artista.' +
                    'OPTIONAL {?canzone dbo:album ?album.' +
                    '?album rdfs:label ?nomeAlbum.}' +
                    'OPTIONAL { ?canzone dbo:genre ?genere.' +
                    '?genere rdfs:label ?nomeGenere.}' +
                    'OPTIONAL { ?canzone dbp:genre ?genere.' +
                    '?genere rdfs:label ?nomeGenere.}' +
                    '?artista rdfs:label ?nomeArtista.' +
                    '}UNION' +
                    '{   ?canzone  dbo:artist ?artista.' +
                    'OPTIONAL {?canzone dbo:album ?album.' +
                    '?album rdfs:label ?nomeAlbum.}' +
                    'OPTIONAL { ?canzone dbo:genre ?genere.' +
                    '?genere rdfs:label ?nomeGenere.}' +
                    'OPTIONAL { ?canzone dbp:genre ?genere.' +
                    '?genere rdfs:label ?nomeGenere.}' +
                    '?artista rdfs:label ?nomeArtista. }' +
                    'FILTER (regex( ?titolo,"' + this.props.canzone + '", "i"))' +
                    'FILTER (regex( ?nomeArtista,"' + this.props.artista + '", "i"))' +

                    'FILTER (lang(?titolo) = "it")' +
                    'FILTER (lang(?nomeArtista) = "it")' +
                    'FILTER (lang(?nomeAlbum) = "it")' +
                    'FILTER (lang(?nomeGenere) = "it")' +
                    'FILTER (lang(?text) = "it")' +
                    '}  LIMIT 1',
                format: 'json'
            }
        })
            .then(res => {
                let canzone = res.data.results.bindings[0];
                if (canzone != null) {
                    this.setState({
                        canzone: {
                            nomeCanzone: ((canzone.titolo.value) ? canzone.titolo.value : ""),
                            wikiDescrizione: ((canzone.text.value) ? canzone.text.value : ""),
                            anno: ((canzone.anno.value) ? canzone.anno.value : ""),
                            artista: ((canzone.nomeArtista) ? canzone.nomeArtista.value : ""),
                            album: ((canzone.nomeAlbum) ? canzone.nomeAlbum.value : ""),
                            genere: ((canzone.nomeGenere) ? canzone.nomeGenere.value : "")

                        },


                    });
                }
                this.setState({ isLoadedCanzone: true, errorCanzone: false });
            })
            .catch(error => {
                this.setState({ isLoadedCanzone: true, errorCanzone: true });
            });
    }


    render() {
        return (
            <div>
                <VisualizerInfoItem loaded={this.state.isLoadedArtista} title="Wiki Artista" content={
                    ((this.state.isLoadedArtista) ?
                        ((!this.state.errorArtista) ?
                            ((this.state.artista.wikiDescrizione) ?
                                <div>
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
                <VisualizerInfoItem loaded={this.state.isLoadedCanzone} title="Wiki Canzone" content={
                    ((this.state.isLoadedCanzone) ?
                        ((!this.state.errorCanzone) ?
                            ((this.state.canzone.wikiDescrizione) ?
                                <div>
                                    <i className="fas fa-music wikiInfo__Icon"></i>
                                    <h2 className="contetTitle">{this.state.canzone.nomeCanzone}</h2>
                                    <p>{this.state.canzone.wikiDescrizione}</p>
                                    <h5><i className="fas fa-calendar-day"></i> Pubblicata il {this.state.canzone.anno} </h5>
                                    <h5><i className="fas fa-microphone"></i> {this.state.canzone.artista}</h5>
                                    {
                                        ((this.state.canzone.album) ?
                                            <h5><i className="fas fa-compact-disc"></i> {this.state.canzone.album}</h5>
                                            :
                                            null
                                        )
                                    }
                                    {
                                        ((this.state.canzone.genere) ?
                                            <h5><i className="fas fa-drum"></i> {this.state.canzone.genere}</h5>
                                            :
                                            null
                                        )
                                    }
                                </div>
                                :
                                <div>
                                    <i className="fas fa-exclamation-circle wikiInfo__Icon"></i>
                                    <h2>La canzone non è stata trovato o non esiste su DBPEDIA.ORG</h2>
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


            </div>
        );
    }


}
export default WikiInfo;