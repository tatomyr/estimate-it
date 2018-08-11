// TODO: implement delete project

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap'
import FA from 'react-fontawesome'
import Header from '../Header'
import { estimateType } from '../Estimate/propTypes'

const Dashboard = ({ estimates }) => (
  <div className="dashboard">
    <Header />
    <Container>
      <Row>
        <Col lg={6}>
          <ListGroup>
            {Object.values(estimates).map(({
              project,
              _id,
              _changed,
              modifiedBy,
            }) => (
              // TODO: move to a separate component
              <ListGroupItem key={_id}>
                <Row>
                  <Col xs={9} sm={10} lg={10}>
                    <Row>
                      <Col xs={12} sm={6} lg={12}>
                        <Link to={`/estimate/${_id}`}>
                          <b>
                            {(_id === 'new' && 'New Project') || project || _id}
                          </b>
                        </Link>
                      </Col>
                      {_id !== 'new' && (
                        <Col xs={12} sm={6} lg={12}>
                          <Badge pill>
                            {moment(_changed).fromNow()}
                            {' by '}
                            {modifiedBy}
                          </Badge>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  {_id !== 'new' && (
                    <Col xs={3} sm={2} lg={2}>
                      <Button outline color="danger">
                        <FA name="trash" />
                      </Button>
                    </Col>
                  )}
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col>
          Other stuff…
        </Col>
      </Row>
    </Container>
  </div>
)

Dashboard.propTypes = {
  estimates: PropTypes.objectOf(estimateType).isRequired,
}

export default Dashboard
