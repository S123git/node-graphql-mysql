// /server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const db = require('./config/db');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'b246203bef60d8600de537f75d3ef73691105ae141203929279c07aa36396685';

const app = express();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        if (token) {
          const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
          return { userId: decoded.userId };
        }
        return {};
      }
});

async function startServer() {
    // Start the Apollo Server
    await server.start();
    
    // Apply middleware to the Express app
    server.applyMiddleware({ app });

    // Start the Express server
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

// Call the function to start the server
startServer();