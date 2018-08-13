import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  ListGroup,
} from 'reactstrap'
import Header from '../Header'
import Project from './Project'
import { estimateType } from '../../helpers/propTypes'

const Dashboard = ({ estimates }) => (
  <div className="dashboard">
    <Header />
    <Container>
      <Row>
        <Col lg={6}>
          <ListGroup>
            {Object.values(estimates).map(estimate => (
              <Project
                key={estimate._id}
                estimate={estimate}
              />
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
