import _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Searchbar from "./components/Searchbar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";
import YTSearch from "youtube-api-search";
import axios from 'axios';
import VideoListItem from "./components/VideoListItem";
import ListaVitali from "./components/ListaVitali";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';
//<img src={logo} className="App-logo" alt="logo" />


class App extends Component {


    constructor(props){
        super(props);
        this.state = {
            lists: [],
            isLoaded: true,
            completeVideoList : [],
        };

    }




    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {


            return (

                <div className="App">
                    <header className="App-header">
                        <h1>Alpha Tubo</h1>
                    </header>

                    <ListaVitali />

                </div>

            );
        }

    }

}

export default App;

/*  <div>
                        <ul className="list-group ">

                            {this.state.completeVideoList.map((obj)=>{
                                return (
                                    <VideoListItem video = {obj}/>
                                )
                            })}

                        </ul>
                    </div>    */
