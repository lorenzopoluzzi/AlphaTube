import React, { Component } from 'react';

import axios from 'axios';
import VideoListItem from "./VideoListItem";
const API_KEY = 'AIzaSyD6ttgMqt8e59sUloLq2F9LYPdOCB7uwyI';

class ListaVitali extends Component {


    constructor(props){

        super(props);
        this.state = {
            lists: [],
            isLoaded: false,
            completeVideoList : [],
            genereIDselected: [],
            videoIDRock: [],
            videoIDPop: [],
        };

    }

    componentDidMount(){
        console.log(this.props.cacca);
        var postTemp = [];
        axios.get('http://site1825.tw.cs.unibo.it/video.json')
            .then(res => {
                postTemp = res.data;

                let videoIDRock = [];
                let videoIDPop = [];
                let videoIDJazz = [];
                let videoIDHh = [];

                for(let item of postTemp) {
                    if (item.category == "Rock" || item.category == "rock" || item.category == "Rock 10" ||  item.category == "Punk" ) {
                        videoIDRock.push(item.videoID);
                    }
                    else if (item.category == "Pop" || item.category == "pop"){
                        videoIDPop.push(item.videoID);
                    }
                    else if (item.category == "Jazz" ){
                        videoIDJazz.push(item.videoID);
                    }
                    else if (item.category == "Rap" || item.category == "Trap" || item.category == "rap" || item.category == "Hip Hop" ){
                        videoIDHh.push(item.videoID);
                    }

                }
                this.setState({
                    videoIDPop,
                    videoIDRock,
                    videoIDJazz,
                    videoIDHh
                })
            });

    }
    componentDidUpdate(prevProps,prevState, snapshot){
        //console.log("cacca");
        if (this.state.genereIDselected !== prevState.genereIDselected) {

            this.setState({completeVideoList : []  })

        let stringID = "";
        let i = 0;
        //console.log("bella li ");
        stringID = this.state.genereIDselected.toString();
        //console.log(stringID);


        if(i = 19){

            axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {'id': stringID,
                    'part': 'snippet,statistics',
                    'key': API_KEY,
                }
            })
                .then(res => {
                   let lista = res.data.items;
                    lista.map((video) => {
                         this.setState({
                             completeVideoList :[...this.state.completeVideoList,video]  //aggiunge il nuovo stato a video list
                         })
                     });
                    this.setState({isLoaded:true});
                });
            i = 0;
            stringID = "";
        }else{
            i++;
        }
    } }

    eventoBottone = (event) => {
        let btn = event.currentTarget.dataset.btn_id;
        if(btn == "btnRock"){
            this.setState({
                    genereIDselected: this.state.videoIDRock
            })
        }
        else if (btn == "btnPop"){
            this.setState({
                genereIDselected: this.state.videoIDPop
            })
        }
        else if (btn == "btnJazz"){
            this.setState({
                genereIDselected: this.state.videoIDJazz
            })
        }
        else if (btn == "btnHh"){
            this.setState({
                genereIDselected: this.state.videoIDHh
            })
        }



    }






    render() {
        //if (!this.state.isLoaded) {
         //   return <div>Loading...</div>;
        //} else {


            return (

                        <div>
                            <button className="btn" data-btn_id="btnRock" onClick= {this.eventoBottone}> ROCK </button>
                            <button className="btn" data-btn_id="btnPop" onClick= {this.eventoBottone}> POP </button>
                            <button className="btn" data-btn_id="btnJazz" onClick= {this.eventoBottone}> JAZZ </button>
                            <button className="btn" data-btn_id="btnHh" onClick= {this.eventoBottone}> HIPHOP </button>



                            <div>
                            {this.state.isLoaded
                                ?
                                this.state.completeVideoList.map((obj,index)=>{
                                return (
                                    <div key={index} className="grid-container"><VideoListItem video = {obj}/></div>
                                )
                                })
                                :
                                <div>Scegli un genere</div>
                            }
                            </div>


        </div>

            );
        }

    //}

}

export default ListaVitali;