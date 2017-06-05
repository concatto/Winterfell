import React from 'react';
import moment from 'moment';
import { Panel, Grid, Row, Col, Media, Image, Glyphicon, Button } from 'react-bootstrap';

const Publication = ({author, timestamp, title, image, reactions, isOwn, onDelete}) => (
  <Panel className="post">
    <Row>
      <Col sm={10} xs={9}>
        <Media>
          <Media.Left>
            <a href={"/profile/" + author.id}>
            <Image src={author.avatar} rounded/>
            </a>
          </Media.Left>
          <Media.Body>
            <a href={"/profile/" + author.id}>
              <Media.Heading>
                <strong>{author.name}</strong>
              </Media.Heading>
            </a>
            <p>{moment.unix(timestamp).fromNow()}</p>
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
        <h4>{reactions.sum} reações</h4>
      </Col>

      <Col xs={6} className="text-right">
        <Button bsStyle="success">Reagir</Button>
      </Col>
    </Row>
  </Panel>
);

export default Publication;