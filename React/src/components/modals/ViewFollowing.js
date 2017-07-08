import React from 'react';
import BaseModal from './BaseModal';
import PersonListContainer from '../../containers/PersonListContainer';
import { connect } from 'react-redux';
import { fetchFollowing } from '../../actions/asyncActions';

const LIMIT = 2;

class ViewFollowing extends React.Component {
  componentDidMount() {
    this.props.fetchFollowing(this.props.id, LIMIT);
  }

  render() {
    const { id } = this.props;
    const data = this.props.following.data.map((item) => this.props.users.data[item]);

    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Pessoas que você segue</BaseModal.Header>

        <BaseModal.Body maximumHeight={400}>
          <PersonListContainer data={data} className="following-list"/>
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
