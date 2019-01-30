import React from 'react';
import '../style/videoDetail.css'
const VideoDetail = ({video}) => {
    
    if(!video) {
        return  <div className="d-flex justify-content-center m-5">
                    <div className="spinner-grow colore-l2pt-at" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>;
    }

let videoId = video.id.videoId;
    
    if(!videoId) {
       videoId = video.id;
    }
    
    const url = 'https://www.youtube.com/embed/' + videoId;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe title="iframe-yt" className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;