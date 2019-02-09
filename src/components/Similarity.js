import React, {Component} from 'react';
import axios from 'axios';
import VideoListItem from "./VideoListItem";
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch} from "../Library/Api-Youtube";

// TODO: gestire bene le promise nel caso genre similarity. Qual è il momento opportuno per fare SetState???

class Similarity extends Component {

	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
 			artistSimilarityVideos: [],
            genreSimilarityVideos: []
 		}
 	}



 	componentDidUpdate(prevProps){

 			if (this.props.selectedVideo !== prevProps.selectedVideo) {

                var trackInfo = ParseTitle(this.props.selectedVideo);
                trackInfo.then(res =>{

                    //Ricerco dei video dello stesso artista
                    var currVideoId = this.props.selectedVideo.id;
        
                    let videos = youtube_videoSearch(res.artist, 'snippet', 20);
                    videos.then(res => {
                        var simVideos = [];
                        res.map(video => {
                            if(video.id != currVideoId) {
                                simVideos.push(video);
                            }
                        })
                        console.log("artistSimilarityVideos:", simVideos);
                        this.setState({isLoaded:true, artistSimilarityVideos: simVideos});
                    })  

                    //Ricerco dei video di artisti simili a quello corrente
                    var videoArray = [];

                    let similarArtists = getSimilarArtistNames(res.artist);
                    similarArtists.then(artistName => {
                        artistName.map(name => {
                            let video = youtube_videoSearch(name, 'snippet', 1);
                            video.then(res => {
                                videoArray.push(res);
                            })
                        })
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
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3 id="h3-l2pt">Artist</h3>
                        <ul className="list-group">{                    
                            this.state.artistSimilarityVideos.map((video, index) => {
                                return (
                                    <VideoListItem
                                        onVideoSelect={this.props.onVideoSelect} 
                                        key={index}
                                        video={video} 
                                    />
                                )
                            })
                        }
                        </ul>
                    </div>
                    <div className="col-6">
                        <h3 id="h3-l2pt">Genre</h3>
                        <ul className="list-group">{                    
                            this.state.genreSimilarityVideos.map((video, index) => {
                                return (
                                    <VideoListItem
                                        onVideoSelect={this.props.onVideoSelect} 
                                        key={index}
                                        video={video} 
                                    />
                                )
                            })
                        }
                        </ul>
                    </div>    
                </div>
            );
        }
 	}
 }

 export default Similarity;