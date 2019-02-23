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
        axios.get('/globpop')
            .then(res => {
                var i = 0;
                res.data.recommended.map((video) => {
                    if(i <= 10){
                        this.videoItems = this.videoItems + video.videoId + ", ";
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
                axios.get('/globpop?id=' + this.videoId + '')
                    .then(res => {
                        var i = 0;
                        res.data.recommended.map((video) => {
                            if(i <= 10){
                                this.videoItems = this.videoItems + video.videoId + ", ";
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