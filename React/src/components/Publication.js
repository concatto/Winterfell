import React from 'react';
import moment from 'moment';
import { Panel, Grid, Row, Col, Media, Image, Glyphicon, Button } from 'react-bootstrap';

const Publication = ({author, timestamp, title, image, reactions, isOwn}) => (
  <Panel>
    <Row>
      <Col sm={10} xs={9}>
        <Media>
          <Media.Left>
            <a href={"/profile/" + author.id}>
            <Image src={author.avatar} rounded/>
            </a>
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <a href={"/profile/" + author.id}>
                <h4><strong>{author.name}</strong></h4>
              </a>
              <p>{moment.unix(timestamp).fromNow()}</p>
            </Media.Heading>
          </Media.Body>
        </Media>
      </Col>

      {isOwn && /* If the current user is the owner of this publication */
        <Col sm={2} xs={3} className="text-right">
          <Button bsStyle="danger"><Glyphicon glyph="trash"/></Button>
        </Col>
      }
    </Row>

    <Row>
      <Col sm={10} xs={9}>
        <h4>{title}</h4>
      </Col>
    </Row>

    <Row>
      <Col xs={12}>
        <Image src={image}/>
      </Col>
    </Row>

    <Row>
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
