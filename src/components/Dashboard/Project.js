// TODO: implement delete project

import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Row,
  Col,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap'
import FA from 'react-fontawesome'
import { estimateType } from '../Estimate/propTypes'

const Project = ({
  estimate: {
    _id,
    _changed,
    project,
    modifiedBy,
    saved,
  },
}) => (
  <ListGroupItem>
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
          <Col xs={12} sm={6} lg={12}>
            {(!saved && (
              <Badge pill color="danger">
                modified
              </Badge>
            )) || (_id !== 'new' && (
              <Badge pill>
                {moment(_changed).fromNow()}
                {' by '}
                {modifiedBy}
              </Badge>
            )) || null}
          </Col>
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
)

Project.propTypes = {
  estimate: estimateType.isRequired,
}

export default Project
