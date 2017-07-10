import React from 'react';
import BaseModal from './BaseModal';
import { Alert } from 'react-bootstrap';
import PersonListContainer from '../../containers/PersonListContainer';
import { connect } from 'react-redux';
import { fetchFollowing } from '../../actions/asyncActions';
import FailureAlert from '../../components/FailureAlert';

const LIMIT = 10;

class ViewFollowing extends React.Component {
  componentDidMount() {
    this.props.fetchFollowing(this.props.id, LIMIT);
  }

  handleScroll(e) {
    const isBottom = e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight;
    if (isBottom && !this.props.following.ended && !this.props.following.error) {
      this.props.fetchFollowing(this.props.id, LIMIT);
    }
  }

  getContent() {
    if (this.props.following.error) {
      return <FailureAlert error={this.props.following.error}/>
    } else {
      const data = this.props.following.data.map((item) => this.props.users.data[item]);
      return (
        <PersonListContainer data={data}
          className="following-list"/>
      );
    }
  }

  render() {
    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Pessoas que você segue</BaseModal.Header>

        <BaseModal.Body maximumHeight={400} onScroll={(e) => this.handleScroll(e)}>
          {this.getContent()}
        </BaseModal.Body>

        <BaseModal.Footer withCancel="Fechar"></BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}

const stateMapper = (state, ownProps) => ({
  ...ownProps,
  following: state.following,
  users: state.users,
});

export default connect(stateMapper, {fetchFollowing})(ViewFollowing);
