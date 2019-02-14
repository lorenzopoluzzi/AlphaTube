import React from 'react';
import { Link } from 'react-router-dom';
import '../style/VideoListItem.css';

const VideoListItem = ({ video, onVideoSelect, timeWinner, siteWinner }) => {

    const imageUrl = video.snippet.thumbnails.default.url;
    const url = "/video/" + video.id;
    return (
        <Link to={url} className="link-url" >
            <li className="list-group-item">
                <div className="video-list media">
                    <div className="media-left">
                        <img className="media-object" src={imageUrl} alt="{imageUrl}" />
                    </div>
                    {(timeWinner ?
                        <div className="media-body">
                            <h5 className="media-heading">{video.snippet.title}</h5>
                            <span className="badge badge-l2pt"><i className="fas fa-globe"></i> {siteWinner}&nbsp;&nbsp;&nbsp;&nbsp; <i className="fas fa-eye"></i>  {timeWinner}</span>
                        </div>
                        :
                        <div className="media-body">
                            <h5 className="media-heading">{video.snippet.title}</h5>
                        </div>
                    )}
                </div>
            </li>
        </Link>
    );
};

export default VideoListItem;