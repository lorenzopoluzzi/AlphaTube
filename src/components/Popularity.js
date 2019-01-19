import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";

class Popularity extends Component {
    videoItems = " ";
    porcodio;
    globalPopularity;
    videoId = null;

    constructor(props) {

        super(props);
        this.state = {
            isLoaded: false,
            isLocal: false,
            isGlobal: true,
            video : []
        };
    }

    componentDidMount() {
        this.videoItems = " ";
        this.altriRecommender = [];

        axios.all([
            axios.get('http://site1828.tw.cs.unibo.it/globpop/'),
            axios.get('http://site1906.tw.cs.unibo.it/globpop/')
        ]).then(res => {
            console.log('SONO NEL GLOBALINO');
            console.log(res);
            this.videoIds = " ";
            res.map((siti) => {
                this.videoIdTemp = null;
                this.timesWhatchedTemp = 0;
                if(siti.data.recommended != null){
                    siti.data.recommended.map((videoDelSito) => {
                        if(videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                            this.timesWhatchedTemp = videoDelSito.timesWatched;
                            if(!videoDelSito.videoID){
                                this.videoIdTemp = videoDelSito.videoId;
                            } else {
                                this.videoIdTemp = videoDelSito.videoID;
                            }
                        }
                    });
                    console.log(this.timesWhatchedTemp);
                    this.videoIds = this.videoIds + this.videoIdTemp + ", ";
                }
            });
            console.log('WEEEEEEEEEEEEE dovrei averti creato la stringa con gli id con maggiore times watched');
            console.log(this.videoIds);
            axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoIds+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                .then(res => {
                    console.log("sono dentro alla ajax call item");
                    console.log(res);
                    this.globalPopularity = res.data.items.map((video) => {
                        return (
                            <VideoListItem
                                onVideoSelect = {this.props.onVideoSelect}
                                key={video.etag}
                                video={video} />
                        );
                    });
                    console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                    console.log(this.globalPopularity);
                    this.setState({isLoaded : true, isLocal: false, isGlobal: true,video: res.data.items});
                });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            this.videoItems = " ";
            this.altriRecommender = [];
            if(this.props.videoSeleceted != null){
                this.videoId = this.props.videoSeleceted.id.videoId;
                if(!this.videoId) {
                    console.log("era vuoto");
                    this.videoId = this.props.videoSeleceted.id;
                    console.log(this.props.videoSeleceted.id);
                    console.log('video id dentro a POPULARITY 1.0:  '+this.videoId);
                }
                console.log('video id dentro a POPULARITY 1.1:  '+this.videoId);
            }

            axios.all([
                axios.get('http://site1828.tw.cs.unibo.it/globpop?id='+this.videoId+''),
                axios.get('http://site1834.tw.cs.unibo.it/globpop?id='+this.videoId+'')
            ]).then(res => {
                console.log('DIO BOIA SONO NEL POPULARITY DELLA RISPOSTA, ANDIAMO A SCOPRIRE');
                console.log(res);
                this.videoIds = " ";
                res.map((siti) => {
                    this.videoIdTemp = null;
                    this.timesWhatchedTemp = 0;
                    siti.data.recommended.map((videoDelSito) => {
                        if(videoDelSito.timesWatched >= this.timesWhatchedTemp) {
                            this.timesWhatchedTemp = videoDelSito.timesWatched;
                            if(!videoDelSito.videoID){
                                this.videoIdTemp = videoDelSito.videoId;
                            } else {
                                this.videoIdTemp = videoDelSito.videoID;
                            }
                        }
                    });
                    console.log(this.timesWhatchedTemp);
                    this.videoIds = this.videoIds + this.videoIdTemp + ", ";
                });
                console.log('WEEEEEEEEEEEEE dovrei averti creato la stringa con gli id con maggiore times watched');
                console.log(this.videoIds);
                axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+this.videoIds+'&key=AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI')
                    .then(res => {
                        console.log("sono dentro alla ajax call item");
                        console.log(res);
                        this.porcodio = res.data.items.map((video) => {
                            return (
                                <VideoListItem
                                    onVideoSelect = {this.props.onVideoSelect}
                                    key={video.etag}
                                    video={video} />
                            );
                        });
                        console.log("DIO CANE DOVREI ESSERE IN DID UPDATE");
                        console.log(this.porcodio);
                        this.setState({isLoaded : true, isLocal: true, isGlobal: true,video: res.data.items});
                    });
            });
        }

    }

    render() {
        if (!this.state.isLoaded) {
            return <div className="spinner-grow colore-l2pt-at" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>;
        } else if(!this.state.isLocal) {
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
export default Popularity;