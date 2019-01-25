import React from 'react';

import CardExample from "./CardsVideo";


const CardItem = ({video, onVideoSelect}) => {
    //const video = props.video;
    const imageUrl = video.snippet.thumbnails.default.url;
    //console.log(imageUrl + 'ehila');
    return (

        <div /* onClick={() => onVideoSelect(video)} */ className="" style={{padding:"0.5em",height:"23em"}} >
           <CardExample value = {video}/>

        </div>

    );
};

export default CardItem;

/*
<div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>

                <div className="media-body">
                    <div className="media-heading"><b>{video.snippet.title}</b></div>

                </div>
                <div className="media-body">
                    <div className="media-mt-0 mb-1">
                        {(video.snippet.description.length>150)? (video.snippet.description.slice(0,150))+'... ' : (video.snippet.description) }

                    </div>
                </div>
            </div>
 */