import React from 'react';
import Publication from './publication.js';
import {DATA} from './publication-data.js';

export default class PublicationPanel extends React.Component {
	constructor() {
		super();

		this.publications = DATA.map((pub) =>
			<Publication data={pub} key={pub.timestamp}/>
		);
	}

	render() {
		return (
			<div className="container">
				{this.publications}
			</div>
		);
	}
}
