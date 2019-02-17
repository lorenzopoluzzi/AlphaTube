import React from 'react';
import CardVideo from "./CardsVideo";
import '../style/cardItem.css'

const CardItem = ({video, onVideoSelect}) => {
    const imageUrl = video.snippet.thumbnails.default.url;
    return (
        <div id="cardItem " className="cardVideo">
           <CardVideo value = {video}/>
        </div>
    );
};

export default CardItem;