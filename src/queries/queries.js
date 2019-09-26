import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const getBooksQuery = gql`
  {
    books {
      name
      id
    }  
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getBookDeailtsQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        name
        age
        books {
          name
          genre
        }
      }
    }  
  }
`

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookDeailtsQuery
}