import React from 'react';
import PublicationHeader from './publication-header.js';
import PublicationContent from './publication-content.js';

export default class Publication extends React.Component {
	render() {
		const {author, timestamp, content, reactions, pubId} = this.props.data;

		return (
			<div className="panel panel-default post friendPost">
				<div className="panel-body">
					<div className="postBox">
						<PublicationHeader author={author} timestamp={timestamp} pubId={pubId}/>
						<PublicationContent title={content.title} image={content.image} reactions={reactions}
							pubId={pubId}/>
					</div>
				</div>
			</div>
		);
	}
}
