import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import {youtube_videoDetails}  from "../Library/Api-Youtube";


class AjaxCall extends Component {
    
    videoIds = " ";
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
            this.videoIds = " ";
            if(this.props.videoSeleceted != null){
                this.videoId = this.props.videoSeleceted.id.videoId;
                if(!this.videoId) {
                    //console.log("era vuoto");
                    this.videoId = this.props.videoSeleceted.id;
                    //console.log(this.props.videoSeleceted.id);
                    //console.log(this.videoId);
                }
                //console.log(this.videoId);
                const url = 'https://www.youtube.com/embed/' + this.videoId;
            }
            axios.get('http://site1825.tw.cs.unibo.it/TW/globpop?id='+this.videoId+'')
                .then(res => {
                    res.data.recommended.map((video) => {
                        this.videoIds = this.videoIds + video.videoID + ", ";
                    });
                    //console.log(this.videoIds);
                    let videos = youtube_videoDetails(this.videoIds,'snippet,statistics');
                    videos.then(res => {
                            //console.log("sono dentro alla ajax call item");
                            //console.log(res);
                            this.porcodio = res.map((video) => {
                                //console.log(video);
                                return (
                                    <VideoListItem
                                        onVideoSelect = {this.props.onVideoSelect}
                                        key={video.etag}
                                        video={video} />
                                );
                            });
                            //console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                            //console.log(this.porcodio);
                            this.setState({isLoaded : true, video: res});
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