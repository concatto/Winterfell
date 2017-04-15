import React from 'react';
import Publication from './publication.js';
import PublicationStore from '../publication-store.js';

export default class PublicationPanel extends React.Component {
	constructor() {
		super();

		this.state = {
			publications: PublicationStore.getData().map((pub) =>
				<Publication data={pub} key={pub.timestamp}/>
			)
		};
	}

	render() {
		return (
			<div className="publications">
				{this.state.publications}
			</div>
		);
	}
}
