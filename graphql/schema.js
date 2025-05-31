// /graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    userId: Int!
  }

  type Query {
    users: [User ]
    user(id: ID!): User
    posts(limit: Int, offset: Int): [Post]
    post(id: ID!): Post
    postsByUser (userId: ID!): [Post]
  }

  type Mutation {
    createUser (name: String!, email: String!, password: String!): User
    createPost(title: String!, content: String!, userId: Int!): Post
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;