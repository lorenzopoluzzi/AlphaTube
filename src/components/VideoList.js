import React from 'react';
import VideoListItem from "./VideoListItem";

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
       return (
           <VideoListItem
               onVideoSelect = {props.onVideoSelect}
               key={video.etag}
               video={video} />
       );
    });
    return (
        <ul className="list-group col-md-4">
            {videoItems}
        </ul>
    );
}

export default VideoList;