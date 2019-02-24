import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import { youtube_videoDetails } from "../Library/Api-Youtube";

class RecommenderRecent extends Component {
    videoItems = " ";
    porcodio;
    videoId = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            video: []
        };
    }

    componentDidMount() {
        var recent = [];
        if (this.props.videoSeleceted !== null) {
            this.videoItems = " ";
            if (this.props.videoSeleceted != null) {
                this.videoId = this.props.videoSeleceted.id.videoId;
                if (!this.videoId) {
                    this.videoId = this.props.videoSeleceted.id;
                }
            }

            var recent = JSON.parse(sessionStorage.getItem("idProva"));
            if (recent) {
                recent.map((video) => {
                    this.videoItems = this.videoItems + video + ", ";
                });
                let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                    .then(res => {
                        this.porcodio = res.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect={this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video} />
                            );
                        });
                        this.setState({ isLoaded: true, video: res });
                    });
            } else {
                this.setState({ isLoaded: true });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            if (this.props.videoSeleceted != null) {
                this.videoId = this.props.videoSeleceted.id.videoId;
                if (!this.videoId) {
                    this.videoId = this.props.videoSeleceted.id;
                }
            }
            var recent = JSON.parse(sessionStorage.getItem("idProva"));
            if (recent) {
                recent.map((video) => {
                    this.videoItems = this.videoItems + video + ", ";
                });
                let videos = youtube_videoDetails(this.videoItems, 'snippet,statistics')
                    .then(res => {
                        this.porcodio = res.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect={this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video} />
                            );
                        });
                        this.setState({ isLoaded: true, video: res });
                    });
            }
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
            if (this.state.video.length > 0) {
                return (
                    <div className="offset-md-3 col-xs-12 col-sm-12 col-md-6">
                        <ul className="list-group">
                            {this.porcodio}
                        </ul>
                    </div>

                );
            } else {
                return (
                    <div className="offset-md-3 col-xs-12 col-sm-12 col-md-6 mt-5">
                        <i className="fas fa-exclamation-circle reccomender-emptyIcon" />
                        <h5> Non hai ancora visto nessun video</h5>
                    </div>
                );
            }

        }
    }
}
export default RecommenderRecent;