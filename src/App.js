import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row } from 'react-bootstrap'

import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:2002/graphql'
})

function App() {
  return (
    <ApolloProvider client={ client }>
      <div id="main">
        <Container>
          <Row>
            <Col lg="12">
              <BookList/>
            </Col>
            <Col lg="12">
              <AddBook/>
            </Col>
          </Row>
        </Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
