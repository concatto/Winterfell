import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {DATA} from './publication-data.js';

/*
<div className="panel panel-default post friendPost">
		<div className="panel-body">
				<div className="postBox">
						<div className="postHeader">
								<!--Avatar BOX -->
								<div className="row">
										<div className="media avatarBox col-sm-10 col-xs-9">
												<div className="media-left">
														<img className="media-object img-rounded" style="width:60px" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg">
												</div>
												<div className="media-body">
														<h4 className="media-heading"><strong>Vinicius Almeida dos Santos</strong></h4>
														<p>7 horas atrás</p>
												</div>
										</div>
								</div>
								
								<h4 style="float:right;"><span className="glyphicon glyphicon-heart"></span> 53%</h4>
								
								<div className="row">
										<div className="col-sm-10 col-xs-9 post-title">
												<h4>Meus novos amigos!</h4>
										</div>
								</div>
						</div>

						<div className="post-content center-block">
								<img src="http://cachorrosfofos.com.br/wp-content/uploads/2014/09/Dachshund-Top-10-ra%C3%A7as-de-cachorros-pequenos-e-fofos1.jpg">
						</div>

						<div className="row">
								<div className="numReactions col-xs-6">
										<h4>398 reações</h4>
								</div>

								<div className="btnReact col-xs-6 text-right">
										<input type="button" className="btn btn-success" value="Reagir" data-toggle="modal" data-target="#reaction-panel"/>
								</div>
						</div>
				</div>
		</div>
</div>
*/

moment.locale('pt-br');

class PublicationHeader extends React.Component {
	render() {
		const {author, timestamp} = this.props;
		return (
			<div className="postHeader">
				<div className="row">
					<div className="media avatarBox col-sm-10 col-xs-9">
						<div className="media-left">
							<img className="media-object img-rounded" src={author.avatar}/>
						</div>
						<div className="media-body">
							<h4 className="media-heading"><strong>{author.name}</strong></h4>
							<p>{moment.unix(timestamp).fromNow()}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class PublicationContent extends React.Component {
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
						<input type="button" className="btn btn-success" value="Reagir" data-toggle="modal" data-target="#reaction-panel"/>
					</div>
				</div>
			</div>
		);
	}
}

class Publication extends React.Component {	
	render() {
		const {author, timestamp, content, reactions} = this.props.data;
		return (
			<div className="panel panel-default post friendPost">
				<div className="panel-body">
					<div className="postBox">
						<PublicationHeader author={author} timestamp={timestamp}/>
						<PublicationContent title={content.title} image={content.image} reactions={reactions}/>
					</div>
				</div>
			</div>
		);
	}
}

const pubs = DATA.map((pub) => 
	<Publication data={pub} key={pub.timestamp}/>
);

ReactDOM.render(
  <div>{pubs}</div>,
  document.getElementById('root')
);