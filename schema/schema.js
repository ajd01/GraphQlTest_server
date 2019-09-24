const gql = require('graphql')
const _ = require('lodash')

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = gql

const books = [
  { name: 'Name if 1', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'Name if 2', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'Name if 3', genre: 'Si-Fi', id: '3', authorId: '3' },
  { name: 'Name if 4', genre: 'Romance', id: '4', authorId: '2' },
  { name: 'Name if 4', genre: '4', id: '4', authorId: '1' }
]

const authors = [
  { name: 'Name author 1', age: '28', id: '1' },
  { name: 'Name author 2', age: '30', id: '2' },
  { name: 'Name author 3', age: '45', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuerytype',
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    book: {
      type: BookType,
      args: { 
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id })
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    },
    author: {
      type: AuthorType,   
      args: { 
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})