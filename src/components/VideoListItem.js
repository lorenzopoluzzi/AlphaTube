import React from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Row, Col, Fa } from 'mdbreact';
import "../style/VideoListItem.css"

const VideoListItem = ({video, onVideoSelect}) => {

    const imageUrl = video.snippet.thumbnails.default.url;
    return (
       
        <div className="" style={{padding:"0.5em",height:"23em"}}>
            <Card  style={{width: "22rem", height:"22em" }}  >
                <CardImage
                    cascade
                    className="img-fluid"
                    src={video.snippet.thumbnails.high.url}
                    style={{width:"100%",height:"180px"}}

                />
                <Button
                    floating
                    tag="a"
                    className="ml-auto mr-4 lighten-3 mdb-coalor"
                    action
                    onClick={() => onVideoSelect(video)}
                >
                    <Fa icon="chevron-right" />
                </Button>
                <CardBody cascade>
                    <CardTitle >{video.snippet.title} </CardTitle>

                </CardBody>
                <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
                    <ul className="list-unstyled list-inline font-small">
                        <li className="list-inline-item pr-2 white-text">
                            <Fa icon="clock-o" /> {video.snippet.publishedAt.slice(0,10)}
                        </li>
                        <li className="list-inline-item pr-2">
                            <a href="#!" className="white-text">
                                <Fa icon="eye" />

                                {(video.statistics.viewCount.length>=5)? (video.statistics.viewCount.slice(0,3))+'K' : (video.statistics.viewCount)}
                            </a>
                        </li>
                        <li className="list-inline-item pr-2">
                            <a href="#!" className="white-text">
                                <Fa icon="thumbs-up"> </Fa>

                                {video.statistics.likeCount}

                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#!" className="white-text">
                                <Fa icon="thumbs-down"> </Fa>
                                {video.statistics.dislikeCount}
                            </a>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>



    );
};

export default VideoListItem;