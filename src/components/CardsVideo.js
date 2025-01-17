import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, Fa } from 'mdbreact';
import '../style/cardsVideo.css';
import Formatter from "./Formatter";
class CardVideo extends Component {
    render() {
        var url = "/video/" + this.props.value.id;
        return (
            <Card>
                <CardImage
                    cascade
                    className="img-fluid"
                    src={this.props.value.snippet.thumbnails.high.url}
                    style={{ width: "100%", height: "11em" }}
                />
                <a href={url} className="link-url">
                    <Button
                        floating
                        tag="a"
                        className="btn-floating ml-auto mr-4 lighten-3 mdb-coalor btn-card buttonabsolute"

                        action

                    >

                        <Fa icon="chevron-right" />

                    </Button>
                </a>
                <CardBody style={{ width: "100%" }} cascade>
                    <CardTitle  >{this.props.value.snippet.title} </CardTitle>
                </CardBody>
                <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
                    <ul className="list-unstyled list-inline font-small">
                        <li className="list-inline-item pr-2 white-text">
                            <Fa icon="calendar-alt" /> {this.props.value.snippet.publishedAt.slice(0, 10)}
                        </li>
                        <li className="list-inline-item pr-2">
                            <span className="white-text">
                                <Fa icon="eye" />
                                <Formatter num={this.props.value.statistics.viewCount} />
                            </span>
                        </li>
                        <li className="list-inline-item pr-2">
                            <span className="white-text">
                                <Fa icon="thumbs-up"> </Fa>
                                <Formatter num={this.props.value.statistics.likeCount} />
                            </span>
                        </li>
                        <li className="list-inline-item">
                            <span className="white-text">
                                <Fa icon="thumbs-down"> </Fa>
                                <Formatter num={this.props.value.statistics.dislikeCount} />
                            </span>
                        </li>
                    </ul>
                </div>
            </Card >
        )
    }
}

export default CardVideo;
