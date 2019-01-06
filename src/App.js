import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import Searchbar from "./components/Searchbar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import YTSearch from "youtube-api-search";
import AjaxCall from "./components/AjaxCall";
import Popularity from "./components/Popularity";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo : null,
        };

    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term:term}, (videos) => {
            this.setState({ videos : videos , selectedVideo : videos[0]});
        });
    }
    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);

        return (
            <div className="App">
                <header className="App-header">

                    <h1>Alpha Tubo</h1>
                </header>
                <Searchbar onSearchTermChange={videoSearch}/>
                <div className="row">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                        videos={this.state.videos}/>
                </div>
                <div class="container">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-fvitali" role="tab" aria-controls="nav-home" aria-selected="true">FVitali</a>
                            <a className="nav-item nav-link" id="nav-agpopularity-tab" data-toggle="tab" href="#nav-agpopularity" role="tab" aria-controls="nav-agpopularity" aria-selected="false">Absolute Global Popularity </a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-fvitali" role="tabpanel" aria-labelledby="nav-fvitali-tab">
                            <AjaxCall
                                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                                videoSeleceted = {this.state.selectedVideo}
                            />
                        </div>
                        <div className="tab-pane fade" id="nav-agpopularity" role="tabpanel" aria-labelledby="nav-agpopularity-tab">
                            <Popularity
                                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                                videoSeleceted = {this.state.selectedVideo}
                            />
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <p>...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
