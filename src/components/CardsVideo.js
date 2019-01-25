import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Row, Col, Fa } from 'mdbreact';

class CardExample extends Component {
    render() {
        return (
                    <Card  style={{width: "22rem", height:"22em" }}  >
                        <CardImage
                            cascade
                            className="img-fluid"
                            src={this.props.value.snippet.thumbnails.high.url}
                            style={{width:"100%",height:"11em"}}

                        />
                        <Button
                            floating
                            tag="a"
                            className="btn-floating ml-auto mr-4 lighten-3 mdb-coalor btn-card buttonabsolute"
                            action

                        >
                            <Fa icon="chevron-right"  />
                        </Button>
                        <CardBody style={{width:"100%"}} cascade>
                            <CardTitle  >{this.props.value.snippet.title} </CardTitle>

                        </CardBody>
                        <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
                            <ul className="list-unstyled list-inline font-small">
                                <li className="list-inline-item pr-2 white-text">
                                    <Fa icon="clock-o" /> {this.props.value.snippet.publishedAt.slice(0,10)}
                                </li>
                                <li className="list-inline-item pr-2">
                                    <a href="#!" className="white-text">
                                        <Fa icon="eye" />

                                        {(this.props.value.statistics.viewCount.length>=5)? (this.props.value.statistics.viewCount.slice(0,3))+'K' : (this.props.value.statistics.viewCount)}
                                    </a>
                                </li>
                                <li className="list-inline-item pr-2">
                                    <a href="#!" className="white-text">
                                        <Fa icon="thumbs-up"> </Fa>

                                        {this.props.value.statistics.likeCount}
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#!" className="white-text">
                                        <Fa icon="thumbs-down"> </Fa>
                                        {this.props.value.statistics.dislikeCount}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Card>
        )
    }
}

export default CardExample;
