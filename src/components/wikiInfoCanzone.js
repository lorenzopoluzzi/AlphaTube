import React, { Component } from 'react';
import axios from 'axios';
import VisualizerInfoItem from './VisualizerInfoItem';
import '../style/VisualizerInfo.css';


const dbpediaUrl = 'http://dbpedia.org/sparql';

class WikiInfoCanzone extends Component {

    constructor(props) {

        super(props);
        this.state = {
            canzone: {
                nomeCanzone: "",
                wikiDescrizione: "",
                anno: "",
                artista: "",
                album: "",
                genere: ""
            },
            errorCanzone: false,
            isLoadedCanzone: false
        }

        this.getInfoWiki_Canzone = this.getInfoWiki_Canzone.bind(this);
    }
    componentDidMount() {
        this.getInfoWiki_Canzone();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.canzone !== prevProps.canzone) {
            this.getInfoWiki_Canzone();
        }
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
            <VisualizerInfoItem loaded={this.state.isLoadedCanzone} title="Wiki Canzone" content={
                ((this.state.isLoadedCanzone) ?
                    ((!this.state.errorCanzone) ?
                        ((this.state.canzone.wikiDescrizione) ?
                            <div className="content-button">
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
        );
    }
}

export default WikiInfoCanzone;