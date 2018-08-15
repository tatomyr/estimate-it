import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Button,
} from 'reactstrap'
import Header from '../Header'
import example from '../../helpers/example'

const Home = () => (
  <div className="home">
    <Header />
    <Container>
      <div className="panel">
        <h2>
          Get started!
        </h2>
        <div className="options">
          <Link to="/estimate/new">
            <Button>
              New estimate
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button>
              Dashboard
            </Button>
          </Link>
          <Link to="/auth">
            <Button>
              User
            </Button>
          </Link>
        </div>
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
