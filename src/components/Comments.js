import React, { Component } from 'react';
import { youtube_getComments } from "../Library/Api-Youtube";

import VisualizerInfoItem from './VisualizerInfoItem';


class Comments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		if (this.props.video) {
			let comments = youtube_getComments(this.props.video.id);
			comments.then(res => {
				this.setState({ data: res, isLoaded: true });
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.video != prevProps.video) {
			let comments = youtube_getComments(this.props.video.id);
			comments.then(res => {
				this.setState({ data: res, isLoaded: true });
			});
		}
	}

	render() {
		if (this.props.video) {
			return (
				<VisualizerInfoItem loaded={this.state.isLoaded} title="Commenti" content={
					<div className="content-button">
						
						{this.state.data.map(comment => {
							return (
								<div className="comment" id={comment.id}>
									<img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} className="rounded-circle" alt="Author Profile Photo" />
									<h5>{comment.snippet.topLevelComment.snippet.authorDisplayName}</h5>
									<p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
								</div>
							);
						})}

					</div>
				} />
			);
		}
		else {
			return (
				<div className="comments col-xs-6">
				</div>
			);
		}

	}
}

export default Comments;