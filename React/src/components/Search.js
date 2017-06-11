import React from 'react';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import PersonListContainer from '../containers/PersonListContainer';
import { Grid, Row, Col, Pagination } from 'react-bootstrap';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: 1};
  }
  componentDidMount() {
    this.props.searchFor(this.props.searchString);
  }

  handleSelect(key) {
    this.setState({page: key});
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
          {this.props.totalResults > 0 &&
            <Row>
              <Col xs={12}>
                <div className="text-center">
                  <Pagination prev next maxButtons={5} ellipsis={null}
                    items={this.props.totalResults} activePage={this.state.page}
                    onSelect={(e) => this.handleSelect(e)}
                  />
                </div>
              </Col>
            </Row>
          }
        </Grid>
      </div>
    );
  }
}
