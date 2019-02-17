import React, {Component} from 'react';
import VideoListItem from "./VideoListItem";
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch, youtube_multiVideoSearch} from "../Library/Api-Youtube";



class SimilarityArtist extends Component {

	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
            artistSimilarityVideos: []
        }
    }


    componentDidMount(){

        if (this.props.selectedVideo !== null) {

            var trackInfo = ParseTitle(this.props.selectedVideo);
            trackInfo.then(res =>{

                //Ricerco dei video dello stesso artista
                var currVideoId = this.props.selectedVideo.id;
    
                let videos = youtube_videoSearch(res.artist, 'snippet', 11);
                videos.then(res => {
                    var simVideos = [];
                    res.map(video => {
                        if(video.id != currVideoId) {
                            simVideos.push(video);
                        }
                    })
                    this.setState({isLoaded: true, artistSimilarityVideos: simVideos});
                })  
            })
        }
    }


    componentDidUpdate(prevProps){

            if (this.props.selectedVideo !== prevProps.selectedVideo) {

                var trackInfo = ParseTitle(this.props.selectedVideo);
                trackInfo.then(res =>{


                    //Ricerco dei video dello stesso artista
                    var currVideoId = this.props.selectedVideo.id;
        
                    let videos = youtube_videoSearch(res.artist, 'snippet');
                    videos.then(res => {
                        var simVideos = [];
                        res.map(video => {
                            if(video.id != currVideoId) {
                                simVideos.push(video);
                            }
                        })
                        console.log("artistSimilarityVideos:", simVideos);
                        this.setState({isLoaded: true, artistSimilarityVideos: simVideos});
                    })  
                })
            }
    }

    render(){

        if (!this.state.isLoaded) {
            return (
                <div className="d-flex justify-content-center m-5">
                    <div className="spinner-grow colore-l2pt-at" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        else {
            return (                
                <div className="col-6 offset-md-3">
                        <ul className="list-group">{                    
                            this.state.artistSimilarityVideos.map((video) => {
                                return (
                                    <VideoListItem
                                        onVideoSelect={this.props.onVideoSelect} 
                                        key={video.id}
                                        video={video} 
                                    />
                                )
                            })
                        }
                        </ul>
                    </div>
            );
        }
    }
 }

export default SimilarityArtist;