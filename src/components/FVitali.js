import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import { youtube_videoDetails } from "../Library/Api-Youtube";

class FVitali extends Component {
    videoItems = " ";
    listaVideoReturn;
    videoId = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            video: []
        };
    }

    componentDidMount() {
        if (this.props.videoSeleceted !== null) {
            this.videoItems = " ";
            this.videoId = this.props.videoSeleceted.id.videoId;
            //questo controllo mi serve perchè non tutti i video hanno l'id nel posto esatto
            if (!this.videoId) {
                this.videoId = this.props.videoSeleceted.id;
            }
            axios.get('http://site1825.tw.cs.unibo.it/TW/globpop?id=' + this.videoId + '')
                .then(res => {
                    res.data.recommended.map((video) => {
                        this.videoItems = this.videoItems + video.videoID + ", ";
                    });
                    let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                        .then(res => {
                            this.listaVideoReturn = res.map((video) => {
                                return (
                                    <VideoListItem
                                        onVideoSelect={this.props.onVideoSelect}
                                        key={video.etag}
                                        video={video} 
                                        recommenderUsato="FVitali"
                                        />
                                );
                            });
                            this.setState({ isLoaded: true, video: res });
                        });
                });
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="d-flex justify-content-center m-5">
                <div className="spinner-grow colore-l2pt-at" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>;
        } else {
            return (
                <div className="offset-md-3 col-xs-12 col-sm-12 col-md-6">
                    <ul className="list-group">
                        {this.listaVideoReturn}
                    </ul>
                </div>

            );
        }
    }
}
export default FVitali;