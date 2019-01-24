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
                            
                        },isLoadedArtista: true
                    });
                }
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
                        isLoadedCanzone: true

                    });
                }
            });
    }


    render() {
        return (
            <div>
                <VisualizerInfoItem loaded={this.state.isLoadedArtista} title="Wiki Artista" content={
                    ((this.state.isLoadedArtista) ?
                        <div>
                            <img src={this.state.artista.urlImmagine} />
                            <h2 className="contetTitle">{this.state.artista.nomeArtista}</h2>
                            <p>{this.state.artista.wikiDescrizione}</p>
                        </div>
                        :
                        <div className="spinner-grow colore-l2pt-at" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )
                } />
                <VisualizerInfoItem loaded={this.state.isLoadedCanzone} title="Wiki Canzone" content={
                    ((this.state.isLoadedCanzone) ?
                        <div>
                            <h2>{this.state.canzone.nomeCanzone}</h2>
                            <p>{this.state.canzone.wikiDescrizione}</p>
                        </div>
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