const {gql} = require('apollo-server-express');

const typeDefs = gql`

type Query{
    me: User
}
type User{
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
}
type Book{
    _id: ID
    bookId: String
    description: String
    title: String
    image: String
    link: String
    authors: [String]
}
type Auth{
    token: ID!
    user: User 
}

input bookInput{
    bookId: String
    description: String
    title: String
    image: String
    link: String
    authors: [String]
}

type Mutation{
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: ID): User
}


`;

module.exports = typeDefs