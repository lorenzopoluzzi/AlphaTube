import React, {Component} from 'react';
import VideoListItem from "./VideoListItem";
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch, youtube_multiVideoSearch} from "../Library/Api-Youtube";



class Similarity extends Component {

	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
            artistSimilarityVideos: [],
            genreSimilarityVideos: []
        }
    }


    componentDidMount(){

        if (this.props.selectedVideo !== null) {

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
                    this.setState({isLoaded: true, artistSimilarityVideos: simVideos});
                })  


                //Ricerco dei video di artisti simili a quello corrente
                let similarArtists = getSimilarArtistNames(res.artist);
                similarArtists.then(artistNames => {
                    let videos = youtube_multiVideoSearch(artistNames, 'snippet');
                    videos.then(res =>
                        this.setState({genreSimilarityVideos: res})
                    )
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


                    //Ricerco dei video di artisti simili a quello corrente
                    let similarArtists = getSimilarArtistNames(res.artist);
                    similarArtists.then(artistNames => {
                        let videos = youtube_multiVideoSearch(artistNames, 'snippet');
                        videos.then(res =>
                            this.setState({genreSimilarityVideos: res})
                        )
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
                    <div className="col-6">
                        <h3 id="h3-l2pt">Genre</h3>
                        <ul className="list-group">{                    
                            this.state.genreSimilarityVideos.map((video) => {
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
                </div>
            );
        }
    }
 }

export default Similarity;