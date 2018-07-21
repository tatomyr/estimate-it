import React from 'react'
import { Container } from 'reactstrap'
import Header from '../Header'
import example from '../../helpers/example'

const Home = () => (
  <div>
    <Header />
    <Container>
      <h2>
        Example
      </h2>
      <article>
        <pre>
          {example}
        </pre>
      </article>
    </Container>
  </div>
)


export default Home
