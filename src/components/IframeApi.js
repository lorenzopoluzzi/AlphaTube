import React, { Component } from 'react';
import CountDown, {CountdownContext} from 'react-countdown-component';
import InfoVideo from './InfoVideo';
import axios from 'axios';
import '../style/cardsVideo.css';
import '../style/IframeApi.css';

class IframeApi extends Component {
    videoItems = " ";
    videoId = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            video: []
        };
    }

    componentDidMount(){
        let videoId = this.props.video.id.videoId;
        if(!videoId) {
            videoId = this.props.video.id;
        }
        if(videoId){
            var YouTubeIframeLoader = require('youtube-iframe');
            var player;
            var isPaused = true;
            var haivisto = false;
            var movies2;
            var time = 0;
            var t = window.setInterval(function() {
                if(!haivisto){
                    if(!isPaused) {
                        time++;
                    }
                    //la correlazione nel json la creo solo se hai visto più 15 secondi
                    if(time >= 15) {
                        //QUESTA PARTE SERVE SOLO PER IL JSON
                        var videoVisto = sessionStorage.getItem("idVisto");
                        //controllo se avevi già visto un video in precedenza
                        if(videoVisto || videoVisto != ""){
                            var jsonPerDB = new Object();
                            //salvo il video che avevo visto
                            jsonPerDB.video2 = videoVisto;
                            var recUsato = sessionStorage.getItem("recUsato");
                            //salvo il recommender con cui sono passato a vedere questo video
                            jsonPerDB.recommender  = recUsato;
                            //salvo il video che sto vedendo
                            jsonPerDB.video1 = videoId;
                            //creo effettivamente il json da mandare alle nostre api
                            var jsonString= JSON.stringify(jsonPerDB);
                            //eseguo la chiamata post per le API create da Turrini
                            axios.post('/api', jsonString, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                        //ci finisco se non avevo visto nessun video prima
                        } else {
                            sessionStorage.setItem("idVisto","null");
                            var jsonPerDB = new Object();
                            //dato che non avevo visto nessun video prima lo setto a NULL (perchè accordato con Turrini che ha creato le API)
                            jsonPerDB.video2 = "null";
                            var recUsato = sessionStorage.getItem("recUsato");
                            //salvo il recommender con cui sono passato a vedere questo video
                            jsonPerDB.recommender  = recUsato;
                            //salvo il video che sto vedendo
                            jsonPerDB.video1 = videoId;
                            //creo effettivamente il json da mandare alle nostre api
                            var jsonString= JSON.stringify(jsonPerDB);
                            //eseguo la chiamata post per le API create da Turrini
                            axios.post('/api', jsonString, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                        }
                        var tmp;
                        //QUESTA PARTE SERVE INVECE PER SALVARE L'ARRAY CHE VERRA' CHIAMATO DAL RECENT
                        //controllo che l'array esista (quindi c'è già stata un po di navigazione nel sito)
                        if(sessionStorage.getItem("idProva")){
                            //eseguo il parse per utilizzare la variabile come un array
                            movies2 = JSON.parse(sessionStorage.getItem("idProva"));
                            //posso settare l'idVisto perchè tanto il json è già stato creato, quindi non intoppa
                            sessionStorage.setItem("idVisto",videoId);
                            //array molto importante perchè sarà utlizzato per salvare i video già visti ma non se si sta ripetendo un video
                            var temp = [];
                            var i;
                            //eseguo il for al contrario semplicemente perchè cosi non mi perdo la successione temporale di come sono
                            //stati visti i video
                            for(i = movies2.length-1; i >= 0; i--){
                                //controllo se il video è presente cosi non lo salvo, ma salvo solo quelli che sono diversi
                                //cosi dopo mi basta inserirlo in testa nell'array temp perchè sono sicuro che non è presente
                                if(movies2[i] != videoId) {
                                    temp.unshift(movies2[i]);
                                }
                            }
                            //fisso una lunghezza massima di video che mi salvo
                            //se l'ho raggiunta devo togliere l'ultimo elemento quindi eseguo la pop
                            //e poi inserire in testa quello attuale con unshift
                            if(temp.length == 10){
                                temp.pop();
                                temp.unshift(videoId);
                                //setto effettivamente l'array che ho creato
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            } else {
                                //non ho raggiunto il limite quindi faccio solo unshift
                                temp.unshift(videoId);
                                //setto effettivamente l'array che ho creato
                                sessionStorage.setItem("idProva",JSON.stringify(temp));
                            }
                            //metto hai visto = true cosi non ripeto sempre gli stessi passaggi
                            haivisto = true;
                        //qui ci finisco se l'array non esiste e quindi non c'è mai stata navigazione sul sito
                        //o comunque non si è mai visto un video per più di 15 secondi
                        } else {
                            //creo l'array con solo il video corrente
                            var movies = [videoId];
                            //setto effettivamente l'array che ho creato
                            sessionStorage.setItem("idProva",JSON.stringify(movies));
                            //posso settare l'idVisto perchè tanto il json è già stato creato, quindi non intoppa
                            sessionStorage.setItem("idVisto",videoId);
                            //metto hai visto = true cosi non ripeto sempre gli stessi passaggi
                            haivisto = true;
                        }
                    }
                }
            }, 1000);
            //configuro le api per il player che utilizzerò per catturare gli eventi su di esso
            YouTubeIframeLoader.load(function(YT) {
                player = new YT.Player('player', {
                    height: '360',
                    width: '640',
                    videoId: videoId,
                    events: {
                    'onStateChange': onPlayerStateChange
                    }
                })
                var playing = false;
                //catturo l'evento si quando il player cambia stato
                function onPlayerStateChange(event) {
                    //eseguo il controllo se è stato messo play
                    if(event.data == YT.PlayerState.PLAYING ) {
                        //setto le variabili che utilizzo sopra per il timer
                        isPaused = false;
                        playing = true;
                    //eseguo il controllo se è stato messo in pausa
                    } else if(event.data == YT.PlayerState.PAUSED){
                        //setto le variabili che utilizzo sopra per il timer
                        isPaused = true;
                        playing = false;
                    }
                }
                function stopVideo() {
                    player.stopVideo();
                }
            });
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="video-detail col-md-6">
                
                <div className="embed-responsive embed-responsive-16by9">
                    <div id="player">
                    </div>
                </div>
                
                <div className="descrizione">
                    <button className="btn btn-primary informazioni" type="button" data-toggle="collapse"
                        data-target="#infoArea" aria-expanded="true" aria-controls="infoArea">
                    <i className="fa fa-info"></i><span> Info</span>
                    </button>
                    
                    <button className="btn btn-primary descrizione" type="button" data-toggle="collapse"
                        data-target="#descrArea" aria-expanded="false" aria-controls="descrArea">
                    <i className="fas fa-pencil-alt"></i><span> Descrizione</span>
                    </button>

                    <div className="collapse show" id="infoArea">
                        <InfoVideo artista={this.props.artista} canzone={this.props.canzone} video={this.props.video}/>
                    </div>
                   
                    <div className="collapse" id="descrArea">
                        <div className="card card-body">
                            {this.props.video.snippet.description}.
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default IframeApi;