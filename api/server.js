
// api/server.js

const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const app = express();


async function start() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        introspection: true,
        playground: {
          settings: {
            'schema.polling.enable': false,
          },
        },
      });

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, path: '/api' });

    app.listen(3000, () => {  /*servidor http://localhost:3000/graphql*/
    console.log('server on port', 3000)
    })
    
}
start()




const server = createServer(app);

module.exports = server;

