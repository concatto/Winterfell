import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import PersonListContainer from '../containers/PersonListContainer';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Search extends React.Component {
  componentDidMount() {
    this.props.searchFor(this.props.searchString);
  }

  render() {
    let content = null;
    if (this.props.working) {
      content = <div className="center-block"><div className="loader"></div></div>
    } else if (this.props.results && this.props.results.length > 0) {
      content = <PersonListContainer displayFollowing className="search-results" data={this.props.results}/>
    } else {
      content = <h4>Nenhuma pessoa encontrada.</h4>
    }

    return (
      <div>
        <NavigationBarContainer/>

        <Grid fluid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <h3>Resultados da pesquisa por "{this.props.searchString}":</h3>
              {content}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
