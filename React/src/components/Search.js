import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
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
            <Col xs={12}>
              <h4>Procurando por: {this.props.searchString}</h4>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
