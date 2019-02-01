import React, {Component} from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import {youtube_videoDetails}  from "../Library/Api-Youtube";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';


class RecommenderSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {

            isLoaded: false,
            video : []
        };
    }

    componentDidMount() {

        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                'part': 'snippet',
                'key': API_KEY,
                'q' : this.props.term,
                'maxResults' : 10,
                'videoEmbeddable' : true ,
                'videoCategoryId' : 10,
                'type' : 'video'
            }
        })
            .then(res => {
                this.videoIds = " ";
                res.data.items.map((video) => {
                    this.videoIds = this.videoIds + video.id.videoId + ", ";
                });
                let videos = youtube_videoDetails(this.videoIds,'snippet,statistics');
                videos.then(res => {
                this.setState({isLoaded : true, video: res});
            })
        })
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
                <div>
                    {
                        this.state.video.map((obj, index) => {
                            return (
                                <div key={index} className="grid-container"><CardItem video={obj} /></div>
                            )
                        })
                    }
                </div>

            );
        }
    }

}

export default RecommenderSearch;