import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../actions/asyncActions';

class Home extends React.Component {
  handleSubmit(e) {
    this.props.authenticate(this.user.value, this.pass.value);
    e.preventDefault();
  }
  
  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="text" name="user" ref={(r) => this.user = r}/>
        <input type="password" name="pass" ref={(r) => this.pass = r}/>
          
        <input type="submit" value="Entrar"/>
      </form>
    );
  }
}


export default connect(undefined, {authenticate})(Home);