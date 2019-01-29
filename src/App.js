import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import Searchbar from "./components/Searchbar";
import ListaVitali from "./pages/ListaVitali";
import VideoDetail from "./components/VideoDetail";
import LocalPopularity from "./components/LocalPopularity";
import YTSearch from "youtube-api-search";
import FVitali from "./components/FVitali";
import Popularity from "./components/Popularity";
import RecommenderSearch from "./components/RecommenderSearch";
import VisualizerInfo from "./components/VisualizerInfo";
import SubMenu from "./components/SubMenu";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class App extends Component {

    sottMenu = [{
        id: '#div-recommender',
        name: 'Reccomender'
    },
    {
        id: '#contact',
        name: 'Info'
    },
    {
        id: '#listaVitali',
        name: 'Lista'
    }
    ];

    constructor(props){
        super(props);
        console.log(props);
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
            <SubMenu tittle="Alfatube" checksearch submenu={this.sottMenu} />
                <div className="row justify-content-center">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VisualizerInfo  />
                </div>
                <div className="container" id="div-recommender">
                    <h3 id="h3-l2pt">RECOMMENDER</h3>
                    <nav id="spacing-nav-l2pt">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="tab-l2pt active" id="nav-home-tab" data-toggle="tab" href="#nav-fvitali" role="tab" aria-controls="nav-home" aria-selected="true"><i
                                className="fas fa-chalkboard-teacher"></i><span id="text-l2pt-tab">FVitali</span></a>
                            <a className="tab-l2pt" id="nav-agpopularity-tab" data-toggle="tab" href="#nav-agpopularity" role="tab" aria-controls="nav-agpopularity" aria-selected="false"><i
                                className="fas fa-globe"></i><span id="text-l2pt-tab">Global Popularity</span> </a>
                            <a className="tab-l2pt" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i
                                className="fas fa-igloo"></i><span id="text-l2pt-tab">Local Popularity</span></a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-fvitali" role="tabpanel" aria-labelledby="nav-fvitali-tab">
                            <FVitali
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
                            <RecommenderSearch />
                            <LocalPopularity 
                                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                                videoSeleceted = {this.state.selectedVideo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default App;