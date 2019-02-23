import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import {youtube_videoDetails}  from "../Library/Api-Youtube";

class LocalPopularity extends Component {
    videoItems = " ";
    porcodio;
    myArrayTimes;
    myArraySite;
    globalPopularity;
    videoId = null;

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLocal: false,
            isGlobal: true,
            video: []
        };
    }

    componentDidMount() {
        axios.get('http://site1825.tw.cs.unibo.it/TW/globpop/')
            .then(res => {
                var i = 0;
                res.data.recommended.map((video) => {
                    if(i <= 3){
                        this.videoItems = this.videoItems + video.videoID + ", ";
                    }
                    i++;
                });
                let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                    .then(res => {
                        this.globalPopularity = res.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect={this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video}
                                    />
                            );
                        });
                    });
            if (this.props.videoSeleceted !== null) {
                this.videoItems = " ";
                if (this.props.videoSeleceted != null) {
                    this.videoId = this.props.videoSeleceted.id.videoId;
                    if (!this.videoId) {
                        this.videoId = this.props.videoSeleceted.id;
                    }
                }
                axios.get('http://site1825.tw.cs.unibo.it/TW/globpop?id=' + this.videoId + '')
                    .then(res => {
                        var i = 0;
                        res.data.recommended.map((video) => {
                            if(i <= 3){
                                this.videoItems = this.videoItems + video.videoID + ", ";
                            }
                            i++;
                        });
                        let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                            .then(res => {
                                this.porcodio = res.map((video) => {
                                    return (
                                        <VideoListItem
                                            onVideoSelect={this.props.onVideoSelect}
                                            key={video.etag}
                                            video={video}
                                            />
                                    );
                                });
                                this.setState({ isLoaded: true, isLocal: true, isGlobal: true, video: res });
                            });
                    });
            } else {
                console.log("eseguo anche l'else, minchia che fenomeno");
                //faccio il ser state per confermare il completamento della chiamata e di tutta la logica del globale assoluto
                this.setState({ isLoaded: true, isLocal: false, isGlobal: true, video: res});
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //questo controllo serve per non far ripetere tante volte questo metodo se le props non sono state cambiate
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            this.altriRecommender = [];
            if (this.props.videoSeleceted != prevProps.videoSeleceted) {
                this.videoId = this.props.videoSeleceted.id.videoId;
                //questo controllo è perchè se videoId non esiste vuol dire che si chiama solo id (dipende sempre da come mi torna la risposta...)
                if (!this.videoId) {
                    this.videoId = this.props.videoSeleceted.id;
                }
            }
            this.myArrayTimes = new Array();
            this.myArrayTimesNonCicl = new Array();
            this.myArraySite = new Array();
            //eseguo la chiamata a tutti i recommender pubblicati passando l'id del video corrente cosi chiamo il globale relativo
            axios.get('http://site1847.tw.cs.unibo.it/globpop?id=' + this.videoId + '').then(res => {
                this.videoIds = " ";
                this.videoIdTemp = null;
                this.timesWhatchedTemp = 0;
                this.nomeSito = res.data.site;
                //controllo se quel valore è null perchè alcuni recommender me li passano dentro a un altro valore della response...
                if (res.data.recommended != null) {
                    //questo for lo faccio per ogni response di ogni sito per andare a prendere il valore maggiore di times watched 
                    //tra i video che mi tornano
                    res.data.recommended.map((videoDelSito) => {
                        if (videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                            this.timesWhatchedTemp = videoDelSito.timesWatched;
                            if (!videoDelSito.videoID) {
                                this.videoIdTemp = videoDelSito.videoId;
                            } else {
                                this.videoIdTemp = videoDelSito.videoID;
                            }
                        }
                    });
                    //qui ho preso il valore del sito maggiore e lo vado a inserire dentro a delle hashmap
                    //dove tramite il videoID ti fanno tornare il valore associato che cercavi cosi da porterlo fare visualizzare dopo
                    //nel frontend
                    this.myArrayTimes[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArrayTimesNonCicl[this.videoIdTemp] = this.timesWhatchedTemp;
                    this.myArraySite[this.videoIdTemp] = this.nomeSito;
                }
                //doppio for che mi serve per fare l'ordinamento dei video in base al timesWhatched cosi da creare la stringa con gli id
                //che passo a youtube per averli già tutti in ordine
                for (var tmpKeyXl in this.myArrayTimes) {
                    var tempinoMax = -1;
                    var sitinoMax = "";
                    for (var key in this.myArrayTimes) {
                        if (this.myArrayTimes[key] > tempinoMax) {
                            tempinoMax = this.myArrayTimes[key];
                            sitinoMax = key;
                        }
                    }
                    this.myArrayTimes[sitinoMax] = -1;
                    this.videoIds = this.videoIds + sitinoMax + ", ";
                }
                //qui ho la stringa ordinata di video id quindi la passo a youtube che mi ritorna le informazioni per i video che mi servono
                let videos = youtube_videoDetails(this.videoIds,'snippet,statistics');
                videos.then(res => {
                        this.porcodio = res.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect={this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video}
                                    timeWinner={this.myArrayTimesNonCicl[video.id]}
                                    siteWinner={this.myArraySite[video.id]} />
                            );
                        });
                        //faccio il ser state per confermare il completamento della chiamata e di tutta la logica del globale relativo
                        this.setState({ isLoaded: true, isLocal: true, isGlobal: true, video: res });
                    });
            });
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="spinner-grow colore-l2pt-at" role="status">
                <span className="sr-only">Loading...</span>
            </div>;
        } else if (!this.state.isLocal) {
            return (
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3 id="h3-l2pt">Relative</h3>
                        <div className="spinner-grow colore-l2pt-at" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div className="col-6">
                        <h3 id="h3-l2pt">Absolute</h3>
                        <ul className="list-group">
                            {this.globalPopularity}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-6">
                        <h3 id="h3-l2pt">Relative</h3>
                        <ul className="list-group">
                            {this.porcodio}
                        </ul>
                    </div>
                    <div className="col-6">
                        <h3 id="h3-l2pt">Absolute</h3>
                        <ul className="list-group">
                            {this.globalPopularity}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}
export default LocalPopularity;