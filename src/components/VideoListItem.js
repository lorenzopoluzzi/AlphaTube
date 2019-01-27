import React from 'react';
import '../style/videoListItem.css'

const VideoListItem = ({video, onVideoSelect, timeWinner, siteWinner}) => {

    const imageUrl = video.snippet.thumbnails.default.url;
    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>
                {(timeWinner ?
                <div className="media-body">
                    <h5 className="media-heading">{video.snippet.title}</h5>
                    <span class="badge badge-l2pt"><i class="fas fa-globe"></i> {siteWinner}&nbsp;&nbsp;&nbsp;&nbsp; <i class="fas fa-eye"></i>  {timeWinner}</span>
                </div>
                :
                <div className="media-body">
                    <h5 className="media-heading">{video.snippet.title}</h5>
                </div>
                )}
            </div>
        </li>
    );
};

export default VideoListItem;