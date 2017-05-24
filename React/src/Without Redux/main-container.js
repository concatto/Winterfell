import React from 'react';

export default class MainContainer extends React.Component {
  render() {
    return (
      <div className="container-fluid below-navigation">
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
