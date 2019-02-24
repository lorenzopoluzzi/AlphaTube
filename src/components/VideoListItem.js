import React from 'react';
import '../style/videoListItem.css';

const VideoListItem = ({ video, onVideoSelect, timeWinner, siteWinner, recommenderUsato }) => {

    const imageUrl = video.snippet.thumbnails.default.url;
    const url = "/video/" + video.id;
    return (
        <a href={url} className="link-url">
            <li className="list-group-item">
                <div className="video-list media mb-sm-l2pt-20">
                    <div className="media-left">
                        <img className="media-object" src={imageUrl} alt="{imageUrl}" />
                    </div>
                    {(timeWinner ?
                        <div className="media-body">
                            <h5 className="media-heading font-size-l2pt-1">{video.snippet.title}</h5>
                            <span className="badge badge-l2pt badge-xs-font-l2pt"><i className="fas fa-globe"></i> {siteWinner}&nbsp;&nbsp;&nbsp;&nbsp; 
                            <div className="d-md-none d-lg-none d-xl-none">
                            </div>
                            <i className="fas fa-eye"></i>  {timeWinner}</span>
                        </div>
                        :
                        <div className="media-body">
                            <h5 className="media-heading">{video.snippet.title}</h5>
                        </div>
                    )}
                </div>
            </li>
        </a>
    );
};

export default VideoListItem;