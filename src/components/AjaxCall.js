import React, {Component} from 'react';
import axios from 'axios';
import VideoList from "./VideoList";
import VideoListItem from "./VideoListItem";
import AjaxCallItem from "./AjaxCallItem";

class AjaxCall extends Component {
    videoItems = " ";
    porcodio;
    constructor(props) {

        super(props);
        this.state = {
            isLoaded: false,
            video : []
        };
    }

    componentDidMount() {
        if(!this.state.isLoaded){
            axios.get('http://site1825.tw.cs.unibo.it/TW/globpop')
                .then(res => {

                    res.data.recommended.map((video) => {
                        this.videoItems = this.videoItems + video.videoID + ", ";
                    });
                    console.log(this.videoItems);
                    axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoItems+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                        .then(res => {
                            console.log("sono dentro alla ajax call item");
                            console.log(res);
                            this.porcodio = res.data.items.map((video) => {
                                return (
                                    <VideoListItem
                                        video={video} />
                                );
                            });
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
                    <ul className="list-group col-md-4">
                        {this.porcodio}
                    </ul>
                </div>

            );
        }
    }
}
export default AjaxCall;