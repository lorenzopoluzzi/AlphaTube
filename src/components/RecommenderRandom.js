import React, { Component } from 'react';
import { youtube_videoSearch } from "../Library/Api-Youtube";
import VideoListItem from "./VideoListItem";

class RecommenderRandom extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoaded: false,
            video: []
        };
    }


    componentDidMount() {
        for (var i = 0; i < 5; i++) {
            var text = generateString(2);
            let videos = youtube_videoSearch(text, 'snippet', 2);
            videos.then(res => {
                //console.log(res);
                res.map((video) => {
                    this.setState({
                        video: [...this.state.video, video]  //aggiunge il nuovo stato a video list
                    });
                });
                this.setState({ isLoaded: true });
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.videoSeleceted !== prevProps.videoSeleceted) {
            for (var i = 0; i < 5; i++) {
                var text = generateString(2);
                let videos = youtube_videoSearch(text, 'snippet', 2);
                videos.then(res => {
                    //console.log(res);
                    res.map((video) => {
                        this.setState({
                            video: [...this.state.video, video]  //aggiunge il nuovo stato a video list
                        });
                    });
                    this.setState({ isLoaded: true });
                   
                })
            }
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
                <div className="offset-md-3 col-xs-12 col-sm-12 col-md-6">
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
export default RecommenderRandom;

export function generateString(lunghezza) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < lunghezza; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}