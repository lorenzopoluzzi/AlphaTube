import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class RecommenderSearch extends Component {

    raccomandatiyt;

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
                'q' : 'mhscio',
                'maxResults' : 10,
                'videoEmbeddable' : true ,
                'videoCategoryId' : 10,
                'type' : 'video'
            }
        })
            .then(res => {
                this.raccomandatiyt = res.data.items.map((video) => {
                    return (
                        <VideoListItem
                            onVideoSelect = {this.props.onVideoSelect}
                            key={video.etag}
                            video={video}
                        />

                    );
                });
                this.setState({isLoaded : true, video: res.data.items});
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
                <div className="col-6 offset-md-3">
                    <ul className="list-group">
                        {this.raccomandatiyt}
                    </ul>
                </div>

            );
        }
    }

}

export default RecommenderSearch;