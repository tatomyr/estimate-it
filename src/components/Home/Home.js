import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap'
import Header from '../Header'
import example from '../../helpers/example'

const Home = () => (
  <div>
    <Header />
    <Container>
      <div className="panel">
        <h2>
          Get started!
        </h2>
        <Row>
          <Col>
            <Link to="/estimate/new">
              <Button>
                New estimate
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/dashboard">
              <Button>
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
      </div>

      <div className="panel">
        <h2>
          Example
        </h2>
        <article>
          <pre>
            {example}
          </pre>
        </article>
      </div>
    </Container>
  </div>
)


export default Home
