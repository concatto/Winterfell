import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import PersonListContainer from '../containers/PersonListContainer';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Search extends React.Component {
  componentDidMount() {
    this.props.searchFor(this.props.searchString);
  }

  render() {
    return (
      <div>
        <NavigationBarContainer/>

        <Grid fluid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <h3>Resultados da pesquisa por "{this.props.searchString}":</h3>
              <PersonListContainer displayFollowing className="search-results" data={this.props.results}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
