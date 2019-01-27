import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";

class FVitali extends Component {
    videoItems = " ";
    porcodio;
    videoId = null;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            video : []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            if(this.props.videoSeleceted != null){
                this.videoId = this.props.videoSeleceted.id.videoId;
                if(!this.videoId) {
                    this.videoId = this.props.videoSeleceted.id;
                }
            }
            axios.get('http://site1825.tw.cs.unibo.it/TW/globpop?id='+this.videoId+'')
                .then(res => {
                    res.data.recommended.map((video) => {
                        this.videoItems = this.videoItems + video.videoID + ", ";
                    });
                    axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoItems+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                        .then(res => {
                            this.porcodio = res.data.items.map((video) => {
                                return (
                                    <VideoListItem
                                        onVideoSelect = {this.props.onVideoSelect}
                                        key={video.etag}
                                        video={video} />
                                );
                            });
                            this.setState({isLoaded : true, video: res.data.items});
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
                <div className="col-6 offset-md-3">
                    <ul className="list-group">
                        {this.porcodio}
                    </ul>
                </div>

            );
        }
    }
}
export default FVitali;