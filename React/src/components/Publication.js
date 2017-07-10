import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Panel, Grid, Row, Col, Media, Image, Glyphicon, Button } from 'react-bootstrap';
import { createProfileHref } from '../utils';
import TimeAgo from 'react-timeago';
import brStrings from 'react-timeago/lib/language-strings/pt-br';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(brStrings);

class Publication extends React.Component {
  wrapIfNeeded(children) {
    if (this.props.isOwn) {
      return children;
    }

    return (
      <Link to={createProfileHref(this.props.author.id)}>
        {children}
      </Link>
    );
  }

  render() {
    const { author, timestamp, title, image, reactions, isOwn, onDelete, onReact } = this.props;

    return (
      <Panel className="post">
        <Row>
          <Col sm={10} xs={9}>
            <Media>
              <Media.Left>
                {this.wrapIfNeeded(
                  <Image src={author.avatar} rounded/>
                )}
              </Media.Left>
              <Media.Body>
                {this.wrapIfNeeded(
                  <Media.Heading>
                    <strong>{author.name}</strong>
                  </Media.Heading>
                )}
                <Link to={createProfileHref(author.id)}>
                </Link>
                <p><TimeAgo date={timestamp} formatter={formatter}/></p>
              </Media.Body>
            </Media>
          </Col>

          {isOwn && /* If the current user is the owner of this publication */
            <Col sm={2} xs={3} className="text-right">
              <Button bsStyle="danger" onClick={() => onDelete()}>
                <Glyphicon glyph="trash"/>
              </Button>
            </Col>
          }
        </Row>

        <Row className="post-title">
          <Col sm={10} xs={9}>
            <h4>{title}</h4>
          </Col>
        </Row>

        <Row className="post-content">
          <Col xs={12}>
            <Image src={image}/>
          </Col>
        </Row>

        <Row className="post-footer">
          <Col xs={6}>
            <h4>{reactions.sum + (reactions.sum == 1 ? " reação" : " reações")}</h4>
          </Col>

          <Col xs={6} className="text-right">
            <Button bsStyle="success" onClick={() => onReact()}>
              {isOwn ? "Ver reações" : "Reagir"}
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Publication;
