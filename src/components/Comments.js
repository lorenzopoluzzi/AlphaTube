import React, {Component} from 'react';
import {youtube_getComments} from "../Library/Api-Youtube";
import '../style/comments.css'

// TODO: Rifiuti soliti urbani senza commenti

class Comments extends Component {

	constructor(props){
		super(props);

		this.state = {
			data : []
		}
	}

	componentDidUpdate(prevProps){
		if (this.props.video != prevProps.video) {
			console.log(this.props.video.id);
			let comments = youtube_getComments(this.props.video.id);
			comments.then(res => {
				this.setState({data : res});
				console.log(this.state.data);
			});
		}

	}

	render(){
		if (this.props.video) {
			return(
				<div className="comments col-8">
					<table className="table">
						<tbody>
							{this.state.data.map(comment => {
								var author = comment.snippet.topLevelComment.snippet.authorDisplayName;
								var content = comment.snippet.topLevelComment.snippet.textOriginal;
								return (
									<tr key={comment.id}>
										<td />
										<td>{author}</td>
										<td>{content}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		}
		else {
			return(
				<div className="comments col-xs-6">
					<p> La tu mamma puttana </p>
				</div>
			);
		}		

	}
}

export default Comments;