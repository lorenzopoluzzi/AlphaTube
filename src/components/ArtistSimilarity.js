import React, {Component} from 'react';
import axios from 'axios';
import CardItem from './CardItem';
import {ParseTitle} from './ParseTitle';
import {getSimilarArtistNames} from "../Library/Api-LastFm";
import {youtube_videoDetails, youtube_videoSearch} from "../Library/Api-Youtube";



class ArtistSimilarity extends Component {

	constructor(props){

 		super(props);

 		this.state = {
            isLoaded : false,
 			videos: []
 		}
 	}

 	componentDidUpdate(prevProps){

 			if (this.props.selectedVideo !== prevProps.selectedVideo) {

                var trackInfo = ParseTitle(this.props.selectedVideo);
 				trackInfo.then(obj => {
                    console.log("trackInfo:", obj);
                    let videos = youtube_videoSearch(obj.artist, 'snippet', 10);
                    videos.then(res => {
                        console.log(res);
                        this.setState({isLoaded: true, videos: res});
                    })
 				})   
 			}
 	}

 	render(){

 		if (!this.state.isLoaded) {
            return (
 				<div>
 					<p> Nessun video selezionato </p>
 				</div>
 			)
 		}
        else {
            return (                
                <div>{
                    this.state.videos.map((video, index) => {
                        return (
                            <div key={index} className="grid-container"><CardItem video={video} /></div>
                        )
                    })
                }
                </div>
)
        }
 	}
 }

 export default ArtistSimilarity;