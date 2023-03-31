const { AuthenticationError } = require('apollo-server-express');
const {User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          return userData
        }
        throw new AuthenticationError('User not logged in')
      }
    },

    Mutation: {
      addUser: async (parent, {username, email, password}) => {
        const user = await User.create({username, email, password});
        const token = signToken(user);
        return {token, user};
      },
      login: async (parent, {email, password}) => {
        const user = await User.findOne({email});

        if(!user){
          throw new AuthenticationError("No user found with this email")
        }
        const correctPW = await user.isCorrectPassword(password)

        if(!correctPW){
          throw new AuthenticationError('Incorrect username or password')
        }
        const token = signToken(user)

        return {token, user}
      },

      saveBook: async (parent, args, context) => {
        if (context.user){
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {savedBooks: args.input}},
          {new: true}
        )
        return updatedUser
        }
        throw new AuthenticationError("Login to save books!")
      }, 

      removeBook: async (parent, {bookId}, context) => {
        if (context.user) {
          const deleteBook = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$pull:{savedBooks: {bookId: bookId}}},
            {new: true}
          )
          return deleteBook;
        }
      }
    }
}

module.exports = resolvers