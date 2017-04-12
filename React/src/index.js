import React from 'react';
import ReactDOM from 'react-dom';

class Publication extends React.Component {
	render() {
		return <h1>React rodando com êxito</h1>;
	}
}

ReactDOM.render(
  <Publication/>,
  document.getElementById('root')
);