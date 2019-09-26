import React, {Component} from 'react'
import { graphql } from 'react-apollo' 
import { getBookDeailtsQuery } from '../queries/queries'
import { Col, Row, Card, ListGroup, Spinner } from 'react-bootstrap';

class BookList extends Component {

  render () {
    if (this.props.data.loading) {
      return (
        <div>Select a Book... <Spinner animation="border" /></div>
      )
    } else {
      const book = this.props.data.book
      if (book) {
        return (
          <Row>
            <Col md="6">
              <Card bg="light" style={{ width: '18rem' }}>
                <Card.Header>Book Details</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <p> <b>Title:</b> {book.name} </p>
                    <p> <b>Genre:</b> {book.genre} </p>
                    <p> <b>Author:</b> {book.author.name} </p>
                    <p> <b>Author age:</b> {book.author.age} </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card bg="light" style={{ width: '18rem' }}>
                <Card.Header>More books about this author</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <ListGroup variant="flush">
                      {
                        book.author.books.map(book => {
                          return (
                            <ListGroup.Item>
                              { book.name } / { book.genre }
                            </ListGroup.Item>
                          )
                        })
                      }
                      </ListGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )
      } else {
        return (
          <div>Select a Book... <Spinner animation="border" /></div>
        )
      }
    }
  }
}

export default graphql(getBookDeailtsQuery,{
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookList)