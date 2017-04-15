import React from 'react';
import moment from 'moment';

export default class PublicationHeader extends React.Component {
	render() {
		const {author, timestamp} = this.props;

		return (
			<div className="postHeader">
				<div className="row">
					<div className="media avatarBox col-sm-10 col-xs-9">
						<a href={"/profile/" + author.id} className="media-left">
							<img className="media-object img-rounded" src={author.avatar}/>
						</a>
						<div className="media-body">
							<h4 className="media-heading">
								<a href={"/profile/" + author.id}><strong>{author.name}</strong></a>
							</h4>
							<p>{moment.unix(timestamp).fromNow()}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
