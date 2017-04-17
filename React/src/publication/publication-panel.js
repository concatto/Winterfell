import React from 'react';
import Publication from './publication.js';
import PublicationStore from '../publication-store.js';

export default class PublicationPanel extends React.Component {
	constructor() {
		super();

		this.state = {
			publications: this.getPublications()
		};

		PublicationStore.on("change", (e) => {
			this.setState({publications: this.getPublications()});
		});
	}

	getPublications() {
		return PublicationStore.getData().map((pub) =>
			<Publication data={pub} key={pub.timestamp}/>
		);
	}

	render() {
		return (
			<div className="publications">
				{this.state.publications}
			</div>
		);
	}
}
