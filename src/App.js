import _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Searchbar from "./components/Searchbar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import YTSearch from "youtube-api-search";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';
//<img src={logo} className="App-logo" alt="logo" />
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo : null
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
            </div>
        );
    }
}

export default App;
