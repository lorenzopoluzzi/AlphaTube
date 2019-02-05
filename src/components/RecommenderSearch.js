import React, { Component } from 'react';
import CardItem from './CardItem';
import { youtube_videoDetails, youtube_videoSearch } from "../Library/Api-Youtube";


class RecommenderSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {

            isLoaded: false,
            video: []
        };
    }

    componentDidMount() {
        let videos = youtube_videoSearch(this.props.term, 'snippet',10);
        videos.then(res => {
            console.log(res);
            this.setState({ isLoaded: true, video: res });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.term !== prevProps.term) {
            let videos = youtube_videoSearch(this.props.term, 'snippet',10);
            videos.then(res => {
                this.setState({ isLoaded: true, video: res });
            })
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