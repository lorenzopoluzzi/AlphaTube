import React, {Component} from 'react';
import VideoListItem from "./VideoListItem";
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch, youtube_multiVideoSearch} from "../Library/Api-Youtube";



class SimilarityGenere extends Component {

	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
            genreSimilarityVideos: []
        }
    }


    componentDidMount(){

        if (this.props.selectedVideo !== null) {

            var trackInfo = ParseTitle(this.props.selectedVideo);
            trackInfo.then(res =>{

                //Ricerco dei video di artisti simili a quello corrente
                let similarArtists = getSimilarArtistNames(res.artist);
                similarArtists.then(artistNames => {
                    let videos = youtube_multiVideoSearch(artistNames, 'snippet');
                    videos.then(res =>
                        this.setState({isLoaded: true,genreSimilarityVideos: res})
                    )
                }) 
            })
        }
    }


    componentDidUpdate(prevProps){

            if (this.props.selectedVideo !== prevProps.selectedVideo) {

                var trackInfo = ParseTitle(this.props.selectedVideo);
                trackInfo.then(res =>{

                    //Ricerco dei video di artisti simili a quello corrente
                    let similarArtists = getSimilarArtistNames(res.artist);
                    similarArtists.then(artistNames => {
                        let videos = youtube_multiVideoSearch(artistNames, 'snippet');
                        videos.then(res =>
                            this.setState({isLoaded: true,genreSimilarityVideos: res})
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
                <div className="col-6 offset-md-3">
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
            );
        }
    }
 }

export default SimilarityGenere;