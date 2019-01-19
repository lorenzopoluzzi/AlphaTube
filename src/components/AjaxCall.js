import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class AjaxCall extends Component {
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
            // Typical usage (don't forget to compare props):
            if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
                this.videoItems = " ";
                if(this.props.videoSeleceted != null){
                    this.videoId = this.props.videoSeleceted.id.videoId;
                    if(!this.videoId) {
                        console.log("era vuoto");
                        this.videoId = this.props.videoSeleceted.id;
                        console.log(this.props.videoSeleceted.id);
                        console.log(this.videoId);
                    }
                    console.log(this.videoId);
                    const url = 'https://www.youtube.com/embed/' + this.videoId;
                }
                axios.get('http://site1825.tw.cs.unibo.it/TW/globpop?id='+this.videoId+'')
                    .then(res => {
                        res.data.recommended.map((video) => {
                            this.videoItems = this.videoItems + video.videoID + ", ";
                        });
                        console.log(this.videoItems);
                        axios.get('https://www.googleapis.com/youtube/v3/videos', {
                            params: {'id': this.videoItems,
                            'part': 'snippet,statistics',
                            'key': API_KEY,
                        }
                        
                    })
                            .then(res => {
                                console.log("sono dentro alla ajax call item");
                                console.log(res);
                                this.porcodio = res.data.items.map((video) => {
                                    console.log(video);
                                    return (
                                        <VideoListItem
                                            onVideoSelect = {this.props.onVideoSelect}
                                            key={video.etag}
                                            video={video} />
                                    );
                                });
                                console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                                console.log(this.porcodio);
                                this.setState({isLoaded : true, video: res.data.items});
                            });
                    });
            }
        }
    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <ul className="list-group">
                        {this.porcodio}
                    </ul>
                </div>

            );
        }
    }
}
export default AjaxCall;