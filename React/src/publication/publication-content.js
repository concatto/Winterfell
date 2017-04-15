import React from 'react';

export default class PublicationContent extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-sm-10 col-xs-9 post-title">
						<h4>{this.props.title}</h4>
					</div>
				</div>

				<div className="post-content center-block text-center">
					<img src={this.props.image}/>
				</div>

				<div className="row">
					<div className="numReactions col-xs-6">
						<h4>{this.props.reactions} reações</h4>
					</div>

					<div className="btnReact col-xs-6 text-right">
						<input type="button" className="btn btn-success" value="Reagir"/>
					</div>
				</div>
			</div>
		);
	}
}
