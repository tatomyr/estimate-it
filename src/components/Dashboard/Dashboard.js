// TODO: implement delete project

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap'
import Header from '../Header'

class Dashboard extends React.Component {
  componentDidMount = () => {
    this.props.fetchTitles()
  }

  render = () => (
    <div>
      <Header />
      <Container>
        <Row>
          <Col lg={6}>
            <ListGroup>
              {Object.values(this.props.estimates).map(({
                project,
                _id,
                _changed,
                modifiedBy,
              }) => (
                <ListGroupItem key={_id}>
                  <Row>
                    <Col xs={9} sm={10} lg={10}>
                      <Row>
                        <Col xs={12} sm={6} lg={12}>
                          <Link to={`/estimate/${_id}`}>
                            <b>
                              {project || _id}
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
                          Del
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
}

Dashboard.propTypes = {
  estimates: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    project: PropTypes.string,
    _changed: PropTypes.string,
    modifiedBy: PropTypes.string,
  })).isRequired,
  fetchTitles: PropTypes.func.isRequired,
}

export default Dashboard
