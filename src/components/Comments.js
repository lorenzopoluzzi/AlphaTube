import React, {Component} from 'react';
import {youtube_getComments} from "../Library/Api-Youtube";


//TODO: gestire il caso di commenti assenti/disabilitati

class Comments extends Component {

	constructor(props){
		super(props);

		this.state = {
			data : []
		}
	}

	componentDidMount(){
		if (this.props.video) {
			let comments = youtube_getComments(this.props.video.id);
			comments.then(res => {
				this.setState({data : res});
			});
		}
	}

	componentDidUpdate(prevProps){
		if (this.props.video != prevProps.video) {
			let comments = youtube_getComments(this.props.video.id);
			comments.then(res => {
				this.setState({data : res});
			});
		}
	}

	render(){
		if (this.props.video) {
			return(
				<table className="table">
					<tbody>
						{this.state.data.map(comment => {
							return (
								<tr key={comment.id}>
									<td> <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} className="rounded-circle" alt="Author Profile Photo" /> </td>
									<td>{comment.snippet.topLevelComment.snippet.authorDisplayName}</td>
									<td>{comment.snippet.topLevelComment.snippet.textOriginal}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		}
		else {
			return(
				<div className="comments col-xs-6">
				</div>
			);
		}		

	}
}

export default Comments;