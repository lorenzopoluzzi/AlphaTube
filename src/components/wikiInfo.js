import React, {Component} from 'react';
import axios from 'axios';

class wikiInfo extends Component {

    constructor(props){
        dbpediaUrl = 'http://dbpedia.org/sparql';

        super(props);
        this.state = {
            artista : {
                nomeArtista : "",
                wikiDescrizione : "",
                tipoArtista : "",
                urlImmagine : ""
            },
            canzone : {
                nomeCanzone : "",
                wikiDescrizione : "",
                anno : "",
                artista : "",
                album : "",
                genere : ""
            }
        }
    }
    componentDidMount() {
    }

    getInfoWiki_Artista() {
        axios.get(this.dbpediaUrl, {
            params: {
                query :'PREFIX org: <http://dbpedia.org/resource/> '+
                    'PREFIX dbo: <http://dbpedia.org/ontology/> '+
                    'PREFIX foaf: <http://xmlns.com/foaf/0.1/> '+
                    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> '+
                    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+
                    
                    'SELECT DISTINCT * WHERE { '+
                    '{ ?artista a dbo:MusicalArtist.'+
                        '?artista rdfs:label ?nome;'+
                        'dbo:thumbnail ?immagine;'+
                        'dbo:abstract ?text .'+
                    '} UNION {'+
                        '?artista a dbo:Band.'+
                        '?artista dbo:background ?tipo.'+
                        '?artista rdfs:label ?nome;'+
                        'dbo:thumbnail ?immagine;'+
                        'dbo:abstract ?text .'+
                    '}'+
                    'FILTER (lang(?nome) = "it")'+
                    'FILTER (lang(?text) = "it")'+
                    
                    'FILTER (regex( ?nome,"'+ this.props.artista +'", "i"))'+
                    '}Order by ASC(?artista) Limit 1',
                format : 'json'
            }
        })
        .then(res => {
            res.data.results.map((artista) => {
                if(artista.bindings[0] != null){
                    this.setState({
                        artista :{
                            nomeArtista : this.props.artista,
                            wikiDescrizione : artista.bindings[0].text.value,
                            tipoArtista : ((artista.bindings[0].tipo)? artista.bindings[0].tipo.value : ""),
                            urlImmagine : artista.bindings[0].immagine.value
                        }
                    });
                }
            });
        });
    }
    
    getInfoWiki_Canzone(){
        axios.get(this.dbpediaUrl, {
            params: {
                query :'PREFIX org: <http://dbpedia.org/resource/> '+
                     'PREFIX dbo: <http://dbpedia.org/ontology/> '+
                     'PREFIX foaf: <http://xmlns.com/foaf/0.1/> '+
                     'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> '+
                     'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+

                     'SELECT DISTINCT ?titolo ?text ?anno ?nomeArtista ?nomeGenere ?nomeAlbum WHERE { '+
                       '?canzone a dbo:MusicalWork;'+
                             ' dbo:abstract ?text ;'+
                              'dbo:releaseDate ?anno;'+
                              'rdfs:label ?titolo.'+
                  '{ ?canzone dbo:musicalArtist ?artista.'+
			                'OPTIONAL {?canzone dbo:album ?album.'+     
		                            '?album rdfs:label ?nomeAlbum.}'+
			                'OPTIONAL { ?canzone dbo:genre ?genere.'+  
                                '?genere rdfs:label ?nomeGenere.}'+
                      'OPTIONAL { ?canzone dbp:genre ?genere.'+
                                  '?genere rdfs:label ?nomeGenere.}'+
			               '?artista rdfs:label ?nomeArtista.'+
		              '}UNION'+
		              '{   ?canzone  dbo:artist ?artista.'+
                       'OPTIONAL {?canzone dbo:album ?album.'  +   
                                   '?album rdfs:label ?nomeAlbum.}'+
                        'OPTIONAL { ?canzone dbo:genre ?genere.' +
                                    '?genere rdfs:label ?nomeGenere.}'+
                         'OPTIONAL { ?canzone dbp:genre ?genere.'+
                                      '?genere rdfs:label ?nomeGenere.}'+
                        '?artista rdfs:label ?nomeArtista. }' +       
                        'FILTER (regex( ?titolo,"'+this.props.canzone+'", "i"))'+
                        'FILTER (regex( ?nomeArtista,"'+this.props.artista+'", "i"))'+
			
                      'FILTER (lang(?titolo) = "it")'+
                      'FILTER (lang(?nomeArtista) = "it")'+
                      'FILTER (lang(?nomeAlbum) = "it")'+
                      'FILTER (lang(?nomeGenere) = "it")'+
                      'FILTER (lang(?text) = "it")'+
                    '}  LIMIT 1',
                format : 'json'
            }
        })
        .then(res => {
            res.data.results.map((canzone) => {
                if(canzone.bindings[0] !=  null){
                    this.setState({
                        canzone :{
                            nomeCanzone : ((canzone.bindings[0].titolo.value)? canzone.bindings[0].titolo.value : ""),
                            wikiDescrizione : ((canzone.bindings[0].text.value)? canzone.bindings[0].text.value : ""),
                            anno : ((canzone.bindings[0].anno.value)? canzone.bindings[0].anno.value : ""),
                            artista : ((canzone.bindings[0].nomeArtista)? canzone.bindings[0].nomeArtista.value : ""),
                            album : ((canzone.bindings[0].nomeAlbum)? canzone.bindings[0].nomeAlbum.value : ""),
                            genere : ((canzone.bindings[0].nomeGenere)? canzone.bindings[0].nomeGenere.value : "")
                        }
                    });
                }
            });
        });
    }
    
    render() {
        return ;
    }


}
export default wikiInfo;