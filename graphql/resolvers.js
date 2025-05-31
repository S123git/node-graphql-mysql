// /graphql/resolvers.js
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'b246203bef60d8600de537f75d3ef73691105ae141203929279c07aa36396685'; 

const resolvers = {
  Query: {
    users: (_, __, { userId }) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return User.findAll();
    },
    user: (_, { id }, { userId }) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return User.findById(id);
    },
    posts: (_, { limit, offset}, {userId}) => {
      if (!userId) {
        throw new Error('Unauthorized');
      }
      return Post.findAll(limit, offset)
    },
    post: (_, { id }) => Post.findById(id),
    postsByUser:  (_, { userId }) => Post.findByUserId(userId),
  },
  User: {
    posts: (user) => Post.findByUserId(user.id),
  },
  Mutation: {
    createUser:  (_, { name, email, password}) => {
      // Logic to insert a new user into the database
        const cretauser = User.create(name, email, password);
        return cretauser;
    },
    register: async (_, { name, email, password }) => {
      const existingUser  = await User.findByEmail(email);
      if (existingUser ) {
        throw new Error('User  already exists with this email.');
      }
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findByEmail(email);
      if (!user) {
        throw new Error('No user found with this email.');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password.');
      }
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      return { token, user };
    },
    createPost: (_, { title, content, userId }) => {
      // Logic to insert a new post into the database
        const createpost = Post.create(title, content, userId);
        return createpost;
    },
  }
};

module.exports = resolvers;