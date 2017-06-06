import React from 'react';

export default class Search extends React.Component {
  render() {
    console.log(this.props);
      
    return (
      <div>{this.props.match.params.string}</div>
    );
  }
}