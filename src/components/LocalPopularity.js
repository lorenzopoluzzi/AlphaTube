import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import { youtube_videoDetails } from "../Library/Api-Youtube";

class LocalPopularity extends Component {
    videoItems = " ";
    listaVideoReturn;
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
        axios.get('/globpop')
            .then(res => {
                var i = 0;
                var nomeSite = res.data.site;
                var countViem = new Array();
                res.data.recommended.map((video) => {
                    //setto il limite di video da prendere in considerazione
                    if (i <= 10) {
                        this.videoItems = this.videoItems + video.videoId + ", ";
                        //mi salvo i timesWatched per ogni video
                        countViem[video.videoId] = video.timesWatched;
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
                                    timeWinner={countViem[video.id]}
                                    siteWinner={nomeSite}
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
                    axios.get('/globpop?id=' + this.videoId + '')
                        .then(res => {
                            var i = 0;
                            var nomeSite = res.data.site;
                            var countViem = new Array();
                            res.data.recommended.map((video) => {
                                //setto il limite di video da prendere in considerazione
                                if (i <= 10) {
                                    this.videoItems = this.videoItems + video.videoId + ", ";
                                    //mi salvo i timesWatched per ogni video
                                    countViem[video.videoId] = video.timesWatched;
                                }
                                i++;
                            });
                            let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                                .then(res => {
                                    this.listaVideoReturn = res.map((video) => {
                                        return (
                                            <VideoListItem
                                                onVideoSelect={this.props.onVideoSelect}
                                                key={video.etag}
                                                video={video}
                                                timeWinner={countViem[video.id]}
                                                siteWinner={nomeSite}
                                            />
                                        );
                                    });
                                    //faccio il ser state per confermare il completamento della chiamata e di tutta la logica del globale assoluto e relativo
                                    this.setState({ isLoaded: true, isLocal: true, isGlobal: true, video: res });
                                });
                        });
                } else {
                    //faccio il ser state per confermare il completamento della chiamata e di tutta la logica del globale assoluto
                    this.setState({ isLoaded: true, isLocal: false, isGlobal: true, video: res });
                }
            });
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
                            {this.listaVideoReturn}
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