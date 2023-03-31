import {gql} from "@apollo/client"

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            _id
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, password: $password, email: $email){
        user{
            _id
            username
            email
            bookCount
            savedBooks{
                bookId
                description
                title
                image
                link
                authors
            }
        }
        token
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: bookInput!){
    saveBook(input: $input){
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            description
            title
            image
            authors
        }
    }
}


`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            description
            title
            image
            authors
        }
    }
}
`;


