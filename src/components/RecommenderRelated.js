import React, {Component} from 'react';
import axios from 'axios';
import {youtube_videoDetails}  from "../Library/Api-Youtube";
import VideoListItem from "./VideoListItem";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';


class RecommenderRelated extends Component {


    constructor(props) {
        super(props);
        this.state = {

            isLoaded: false,
            video : []
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log(this.props);

        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    'relatedToVideoId': this.props.videoSeleceted.id,
                    'part': 'snippet',
                    'key': API_KEY,
                    'maxResults': 10,
                    'videoEmbeddable': true,
                    'videoCategoryId': 10,
                    'type': 'video',


                }
            })
                .then(res => {
                    this.videoIds = " ";
                    res.data.items.map((video) => {
                        this.videoIds = this.videoIds + video.id.videoId + ", ";
                    });
                    console.log(this.videoIds);
                    let videos = youtube_videoDetails(this.videoIds, 'snippet,statistics');
                    videos.then(res => {
                        this.setState({isLoaded: true, video: res});
                    })
                })
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
                    {
                        this.state.video.map((obj, index) => {
                            return (

                                <VideoListItem key={index} video={obj} />


                            )
                        })
                    }
                    </ul>
                </div>

            );
        }
    }

}

export default RecommenderRelated; 