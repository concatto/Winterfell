import React from 'react';
import moment from 'moment';
import UserStore from '../user-store.js';
import Modals from '../modals.js';

class DeleteButton extends React.Component {
	render() {
		const {target} = this.props;

		return (
			<div className="col-sm-2 col-xs-3 pull-right">
				<a className="btn btn-sm btn-danger delete-button" onClick={(e) => Modals.open("delete-pub", {target})}>
					<span className="glyphicon glyphicon-trash"></span>&nbsp;
				</a>
			</div>
		);
	}
}

export default class PublicationHeader extends React.Component {
	render() {
		const {author, timestamp} = this.props;
		const own = author.id == UserStore.getInformation().id;

		return (
			<div className="postHeader">
				<div className="row">
					<div className="media avatarBox col-sm-10 col-xs-9">
						<a href={"/profile/" + author.id} className="media-left">
							<img className="media-object img-rounded" src={author.avatar}/>
						</a>
						<div className="media-body">
							<h4 className="media-heading">
								<a href={"/profile/" + author.id}>
									<strong>{author.name}</strong>
								</a>
							</h4>
							<p>{moment.unix(timestamp).fromNow()}</p>
						</div>
					</div>
					{own &&
						<DeleteButton target={author.id}/>
					}
				</div>
			</div>
		);
	}
}
