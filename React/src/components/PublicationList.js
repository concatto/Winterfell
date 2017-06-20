import Publication from './Publication';
import React from 'react';
import { Panel } from 'react-bootstrap';

class PublicationList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollHandler = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    const height = document.body.scrollTop + window.innerHeight;

    if (document.body.scrollHeight === height) {
      if (!this.props.fetching) {
        //this.fetch(); //Tratar de offset, quantos sobrando, etc.
      }
    }
  }

  fetch() {
    if (this.props.isFeed) {
      this.props.fetchFeed();
    } else {
      this.props.fetchPublications(this.props.id);
    }
  }

  componentDidMount() {
    this.fetch();
    document.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFeed != prevProps.isFeed || this.props.id != prevProps.id) {
      this.fetch();
    }
  }

  mapPublications() {
    return this.props.data.map((pub) => {
      pub = {
        ...pub,
        onDelete: () => this.props.onDelete(pub.id),
      };

      return (
        <Publication {...pub} key={pub.id}/>
      );
    });
  }

  getContent() {
    if (this.props.fetching && this.props.data.length == 0) {
      return (
        <Panel className="post">
          <div className="center-block"><div className="loader"></div></div>
        </Panel>
      );
    } else if (this.props.data && this.props.data.length > 0) {
      return this.mapPublications();
    } else {
      return (
        <Panel className="post">
          <h4>Nenhuma publicação a ser exibida. :(</h4>
        </Panel>
      );
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.getContent()}
      </div>
    );
  }
};

export default PublicationList;
